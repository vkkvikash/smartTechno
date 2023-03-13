import Button from "@components/ui/button";
import { useUI } from "@contexts/ui.context";
import React from "react";
import { IoStar } from "react-icons/io5";
import ProductReviewList from "./ProductReviewList";



const ProductReview: React.FC<any> = ({ data }) => {
    const { openModal, setModalView, setModalData } = useUI();
    const openReviewModal = () => {
        setModalView('PRODUCT_REVIEW_VIEW')
        openModal();
    }
    return (
        <div className="block lg:grid grid-cols-12 gap-x-10 xl:gap-x-14 pt-2 pb-10 lg:pb-14 2xl:pb-20 items-start ">
            <div className="col-span-12 pt-8 lg:pt-0">
            <span className="reviews__bottomline__text flex align-center">4.9 <IoStar />&nbsp;&nbsp;|&nbsp;&nbsp;1490 Total Reviews</span> &nbsp;&nbsp;
                <Button onClick={openReviewModal}>Share Review</Button>
            </div>
            <div className="col-span-12 pt-8 lg:pt-0">
                <ProductReviewList />
            </div>
        </div>
    );
};

export default ProductReview;
