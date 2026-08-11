export default function Inquiry() {
  return (
    <div className="min-h-screen bg-black text-white py-32 px-6">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">
          ثبت درخواست <span className="text-[#FFC000]">استعلام قیمت</span>
        </h1>

        <p className="text-gray-400 mb-12 text-lg">
          اگر قیمت محصول در فروشگاه موجود نیست، فرم زیر را تکمیل کنید.
          کارشناسان SANAT-Pro در کوتاه‌ترین زمان با شما تماس می‌گیرند.
        </p>

        <form className="grid md:grid-cols-2 gap-6">
          <input
            placeholder="نام شرکت / پروژه"
            className="bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#FFC000]"
          />
          <input
            placeholder="نام و نام خانوادگی"
            className="bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#FFC000]"
          />
          <input
            placeholder="شماره تماس"
            className="bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#FFC000]"
          />
          <input
            placeholder="ایمیل (اختیاری)"
            className="bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#FFC000]"
          />

          <textarea
            placeholder="توضیح تجهیز، ظرفیت، تعداد، محل پروژه..."
            rows={5}
            className="md:col-span-2 bg-gray-900 border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-[#FFC000]"
          />

        <button

  type="submit"
  className="md:col-span-2 w-full bg-[#FFC000] text-black py-4 rounded-xl font-extrabold text-lg hover:opacity-90 transition text-center"
>
  ارسال درخواست استعلام
</button>

        </form>
      </div>
    </div>
  );
}
