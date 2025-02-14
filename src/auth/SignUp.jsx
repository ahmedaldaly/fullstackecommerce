import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Cookie from 'js-cookie'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("🔹 البيانات المرسلة:", data);

    try {
      const response = await axios.post("http://localhost:4000/api/vi/auth/register", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log( response.data.user);
      const token = response.data.user.token;
      Cookie.set('token',token ,{expires:4})
       Cookies.set("id", id, { expires: 4 })
      window.location.href = "/";

    } catch (error) {
      console.error("❌ خطأ أثناء الإرسال:", error.response?.data || error);
      alert(error.response?.data?.message || "حدث خطأ أثناء التسجيل");
    }
  };

  return (
    <div>
      <h2>تسجيل حساب جديد</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "300px",
          margin: "auto",
        }}
      >
        {/* اسم المستخدم */}
        <input
          {...register("username", { required: "اسم المستخدم مطلوب" })}
          placeholder="أدخل اسم المستخدم"
        />
        {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}

        {/* البريد الإلكتروني */}
        <input
          type="email"
          {...register("email", {
            required: "البريد الإلكتروني مطلوب",
            pattern: { value: /\S+@\S+\.\S+/, message: "البريد الإلكتروني غير صحيح" },
          })}
          placeholder="البريد الإلكتروني"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}

        {/* كلمة المرور */}
        <input
          type="password"
          {...register("passwoard", {
            required: "كلمة المرور مطلوبة",
            minLength: { value: 6, message: "يجب أن تكون كلمة المرور على الأقل 6 أحرف" },
          })}
          placeholder="كلمة المرور"
        />
        {errors.passwoard && <p style={{ color: "red" }}>{errors.passwoard.message}</p>}

        <button type="submit">تسجيل</button>
      </form>
    </div>
  );
};

export default SignUp;
