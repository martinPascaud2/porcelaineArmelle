export const types = [
  {
    name: "Verseuses",
    imagePath: `${process.env.NEXT_PUBLIC_APP_URL}/verseuses.jpg`,
  },
  {
    name: "Coulée verte",
    imagePath: `${process.env.NEXT_PUBLIC_APP_URL}/coulée verte.jpg`,
  },

  {
    name: "Truc",
    imagePath: `${process.env.NEXT_PUBLIC_APP_URL}/truc.jpg`,
  },
];

export const articlesPerPage = 6;

export const globalPresentation =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.";

export const experiencesData = {
  2023: [
    {
      name: "ÉTABLI 65",
      address: "9 avenue Sommeiller, Annecy",
      dates: "du 01/07 au 30/09",
      imagePath: `${process.env.NEXT_PUBLIC_APP_URL}/apropos/Etabli-65.jpeg`,
    },
    {
      name: "MA CHOUETTE BOUTIQUE",
      address: "9 faubourg des Annonciades, Annecy",
      dates: "du 01/03 au 30/06",
      imagePath: `${process.env.NEXT_PUBLIC_APP_URL}/apropos/Ma-chouette-boutique.jpeg`,
    },
  ],

  2022: [
    {
      name: "TERRES DE SÈVRES",
      address: "Square Carrier Belleuse, Sèvres",
      dates: "du 5/05 au 18/06",
      imagePath: `${process.env.NEXT_PUBLIC_APP_URL}/apropos/Sevres-Festival-de-la-ceramique-2022.jpeg`,
    },
  ],
};
