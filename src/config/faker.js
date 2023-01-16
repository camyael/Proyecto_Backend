import { faker } from "@faker-js/faker";

faker.locale = "es"

const generateProducts = () => {
    return {
        id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.nature()
    }
}

export default generateProducts;