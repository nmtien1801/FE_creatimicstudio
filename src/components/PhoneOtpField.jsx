import React, { useState } from "react";
import { toast } from "react-toastify";
import ApiOtp from "../apis/ApiOtp";

const PhoneOtpField = ({
  phoneNumber,
  onPhoneNumberChange,
  onVerifiedChange,
  verified = false,
  variant = "contact",
}) => {
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isContactVariant = variant === "contact";
  const phoneInputClass = isContactVariant
    ? "w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#ed792f]"
    : "w-full py-3 sm:py-4 px-4 sm:px-5 bg-white border border-[#f5b890] rounded-xl sm:rounded-2xl outline-none focus:border-[#e8702a] focus:ring-2 focus:ring-orange-200 text-sm sm:text-base text-gray-900 transition-all placeholder:text-gray-400";
  const actionButtonClass = isContactVariant
    ? "px-4 py-2 font-bold text-sm rounded-lg text-white bg-[#ed792f] hover:bg-[#d8681e] disabled:bg-gray-400 disabled:cursor-not-allowed"
    : "px-4 py-3 font-bold text-sm rounded-xl text-white bg-[#e8702a] hover:bg-[#d4621e] disabled:bg-gray-400 disabled:cursor-not-allowed";

  const handlePhoneChange = (event) => {
    setOtpCode("");
    setOtpSent(false);
    onVerifiedChange(false);
    onPhoneNumberChange(event.target.value);
  };

  const handleSendOtp = async () => {
    if (loading) return;
    setLoading(true);
    onVerifiedChange(false);

    try {
      const response = await ApiOtp.sendOtpApi({ phoneNumber });
      if (!response?.success) {
        toast.error(response?.message || "Không thể gửi mã OTP.");
        return;
      }

      setOtpSent(true);
      setOtpCode("");
      toast.success(response.message || "Mã OTP đã được gửi.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(
        error.response?.data?.message || "Gửi mã OTP thất bại. Vui lòng thử lại.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await ApiOtp.verifyOtpApi({ phoneNumber, otpCode });
      if (!response?.success) {
        toast.error(response?.message || "Không thể xác thực mã OTP.");
        return;
      }

      onVerifiedChange(true);
      toast.success(response.message || "Xác thực số điện thoại thành công.");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(
        error.response?.data?.message || "Xác thực OTP thất bại. Vui lòng thử lại.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label
        className={
          isContactVariant
            ? "block text-xs font-bold text-gray-700 mb-1"
            : "sr-only"
        }
      >
        SĐT*
      </label>
      <div className="flex gap-2">
        <input
          type="tel"
          name="phone"
          required
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={
            isContactVariant
              ? "Nhập số điện thoại"
              : "Nhập số điện thoại của bạn..."
          }
          className={`${phoneInputClass} min-w-0 flex-1`}
        />
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={loading || verified || !phoneNumber.trim()}
          className={`${actionButtonClass} shrink-0`}
        >
          {loading ? "Đang xử lý..." : otpSent ? "Gửi lại mã" : "Gửi mã OTP"}
        </button>
      </div>

      {otpSent && !verified && (
        <div className="flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            value={otpCode}
            onChange={(event) =>
              setOtpCode(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            placeholder="Nhập mã OTP 6 chữ số"
            aria-label="Mã OTP"
            className={`${phoneInputClass} min-w-0 flex-1`}
          />
          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={loading || otpCode.length !== 6}
            className={`${actionButtonClass} shrink-0`}
          >
            Xác thực
          </button>
        </div>
      )}

      {verified && (
        <p className="text-sm font-medium text-green-600">
          Số điện thoại đã được xác thực.
        </p>
      )}
    </div>
  );
};

export default PhoneOtpField;
