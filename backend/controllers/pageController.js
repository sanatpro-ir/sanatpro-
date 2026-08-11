/*
 فعلا fake db
 بعدا Mongo
*/

const pages = [
  {
    page: "home",

    sections: [

      {
        id: "hero_001",

        type: "hero",

        enabled: true,

        order: 1,

        settings: {
          title: "نسل جدید صنعت",
          subtitle: "ساخت آینده با فناوری صنعتی نسل بعد",
          buttonText: "شروع کنید",
          animation: "zoom"
        }
      },

      {
        id: "products_001",

        type: "products",

        enabled: true,

        order: 2,

        settings: {
          title: "محصولات ویژه",
          limit: 8
        }
      }

    ]
  }
];



exports.getPage = (req, res) => {
  const page = pages.find(
    p => p.page === req.params.page
  );

  if (!page) {
    return res.status(404).json({
      message: "page not found"
    });
  }

  res.json(page);
};