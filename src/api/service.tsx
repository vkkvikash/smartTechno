import axios, { AxiosRequestConfig, Method } from 'axios';
import { baseUrl } from "../config/constants"


export const submitAPI = async (data: any, method: Method, path: string, headers: any) => {
    return new Promise((resolve, reject) => {
        var config: AxiosRequestConfig = {
            method,
            url: baseUrl + path,
            headers: headers,
            data: data
        };
        axios(config)
            .then(function (response) {
                resolve(response.data)
            })
            .catch(function (error) {
                console.error(error.message)
                reject({ success: false, message: "Error while processing your request! please try again later", error: error.message, status: 501 })
            });
    })

}

export const ProductJSONMaker = (productList: []) => {
    const newProduct: any = []
    productList.map((product: any) => {
        let obj = {
            "id": product.id,
            "user_id": product.user_id ? product.user_id : 0,
            "brand_id": product.brand_id ? product.brand_id : 0,
            "name": product.product_name,
            "description": product.description ? product.description : "NA",
            "quantity": product?.vendor_info?.quantity,
            "model": product.model_number ? product.model_number : "NA",
            "ratings": product?.avgrating ? product?.avgrating : 0,
            "slug": product.slug,
            "label": product?.product_label,
            "isNewArrival": true,
            "metaTitle": product?.meta_title,
            "metaDescription": product?.meta_description,
            "image": {
                "id": 1,
                "thumbnail": product?.image?.image_small,
                "original": product?.image?.image,
                "tabImage": product?.image?.image_medium
            },
            "gallery": [
                {
                    "id": 1,
                    "thumbnail": product?.image?.image_small,
                    "original": product?.image?.image,
                    "tabImage": product?.image?.image_medium
                },
                {
                    "id": 2,
                    "thumbnail": product?.image?.image_small,
                    "original": product?.image?.image,
                    "tabImage": product?.image?.image_medium
                },
                {
                    "id": 3,
                    "thumbnail": product?.image?.image_small,
                    "original": product?.image?.image,
                    "tabImage": product?.image?.image_medium
                },
                {
                    "id": 4,
                    "thumbnail": product?.image?.image_small,
                    "original": product?.image?.image,
                    "tabImage": product?.image?.image_medium
                }
            ],
            "price": Number(product?.vendor_info?.price),
            "sale_price": product?.vendor_info?.discount_price && Number(product?.vendor_info?.discount_price) === Number(product?.vendor_info?.price) ? 0 : Number(product?.vendor_info?.price) - Number(product?.vendor_info?.discount_price),
            "variations": [
                {
                    "id": 1,
                    "value": "S",
                    "attribute": {
                        "id": 1,
                        "name": "Size",
                        "slug": "size"
                    }
                },
                {
                    "id": 2,
                    "value": "M",
                    "attribute": {
                        "id": 1,
                        "name": "Size",
                        "slug": "size"
                    }
                },
                {
                    "id": 3,
                    "value": "L",
                    "attribute": {
                        "id": 1,
                        "name": "Size",
                        "slug": "size"
                    }
                },
                {
                    "id": 4,
                    "value": "XL",
                    "attribute": {
                        "id": 1,
                        "name": "Size",
                        "slug": "size"
                    }
                },
                {
                    "id": 5,
                    "value": "Orange",
                    "meta": "#e86c25",
                    "attribute": {
                        "id": 1,
                        "name": "Color",
                        "slug": "color"
                    }
                },
                {
                    "id": 6,
                    "value": "Pink",
                    "meta": "#ffa5b4",
                    "attribute": {
                        "id": 1,
                        "name": "Color",
                        "slug": "color"
                    }
                },
                {
                    "id": 7,
                    "value": "Purple",
                    "meta": "#8224e3",
                    "attribute": {
                        "id": 1,
                        "name": "Color",
                        "slug": "color"
                    }
                },
                {
                    "id": 8,
                    "value": "Red",
                    "meta": "#dd3333",
                    "attribute": {
                        "id": 1,
                        "name": "Color",
                        "slug": "color"
                    }
                }
            ]
        }
        newProduct.push(obj)
    })
    return newProduct;
}

