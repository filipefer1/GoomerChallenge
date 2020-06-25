export const dummy = {
  name: "test2",
  picture: "imagePicture",
  address: {
    street: "Rua1",
    city: "Valparaíso",
    zipCode: "1234-789",
    state: "GO",
  },
  week: [
    {
      day: "monday",
      open: false,
    },
    {
      day: "tuesday",
      open: true,
      openingTime: "09:00",
      closingTime: "22:15",
    },
    {
      day: "wednesday",
      open: true,
      openingTime: "09:00",
      closingTime: "22:15",
    },
    {
      day: "thursday",
      open: true,
      openingTime: "09:00",
      closingTime: "22:15",
    },
    {
      day: "friday",
      open: true,
      openingTime: "09:00",
      closingTime: "22:15",
    },
    {
      day: "saturday",
      open: true,
      openingTime: "16:00",
      closingTime: "00:00",
    },
    {
      day: "sunday",
      open: true,
      openingTime: "09:00",
      closingTime: "23:00",
    },
  ],
};
export const dummyRestaurantInvalid = {
  name: "test2",
  picture: "imagePicture",
  address: {
    street: "Rua1",
    city: "Valparaíso",
    zipCode: "1234-789",
    state: "GO",
  },
  week: [
    {
      day: "monday",
      open: true,
    },
    {
      day: "tuesday",
      open: true,
      openingTime: "09:00",
      closingTime: "22:15",
    },
    {
      day: "wednesday",
      open: true,
      openingTime: "09:00",
      closingTime: "22:15",
    },
    {
      day: "thursday",
      open: true,
      openingTime: "09:00",
      closingTime: "22:15",
    },
    {
      day: "friday",
      open: true,
      openingTime: "09:00",
      closingTime: "22:15",
    },
    {
      day: "saturday",
      open: true,
      openingTime: "16:00",
      closingTime: "00:00",
    },
    {
      day: "sunday",
      open: true,
      openingTime: "09:00",
      closingTime: "23:00",
    },
  ],
};

export const dummyProduct = {
	name: "Product3",
	picture: "productPicture2",
	price: 19.99,
	category: "salgado",
	promotion: {
		description: "Description test",
		promotionalPrice: 15.99,
		days: [
			{
				day: "monday",
				isItInPromotion: false,
				startPromotion: "18:30",
				endPromotion: "20:00"
			},
			{
				day: "tuesday",
				isItInPromotion: false,
				startPromotion: "18:30",
				endPromotion: "20:00"
			},
			{
				day: "wednesday",
				isItInPromotion: false,
				startPromotion: "18:30",
				endPromotion: "20:00"
			},
			{
				day: "thursday",
				isItInPromotion: false
			},
			{
				day: "friday",
				isItInPromotion: true,
				startPromotion: "18:30",
				endPromotion: "20:00"
			},
			{
				day: "saturday",
				isItInPromotion: false
			},
			{
				day: "sunday",
				isItInPromotion: false
			}
		]
	}
}
export const dummyProductInvalid = {
	name: "Product3",
	picture: "productPicture2",
	price: 19.99,
	category: "salgado",
	promotion: {
		description: "Description test",
		promotionalPrice: 15.99,
		days: [
			{
				day: "monday",
				isItInPromotion: true,
				startPromotion: "18:30",
				endPromotion: "20:00"
			},
			{
				day: "tuesday",
				isItInPromotion: false,
				startPromotion: "18:30",
				endPromotion: "20:00"
			},
			{
				day: "wednesday",
				isItInPromotion: false,
				startPromotion: "18:30",
				endPromotion: "20:00"
			},
			{
				day: "thursday",
				isItInPromotion: false
			},
			{
				day: "friday",
				isItInPromotion: true,
				startPromotion: "18:30",
				endPromotion: "20:00"
			},
			{
				day: "saturday",
				isItInPromotion: false
			},
			{
				day: "sunday",
				isItInPromotion: false
			}
		]
	}
}