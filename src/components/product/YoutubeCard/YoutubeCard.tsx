import React, { useState } from "react";


const YoutubeCard: React.FC<any> = () => {

    return (
        <>
            <iframe
                src={`https://www.youtube.com/embed/7QeoZY4tf9I`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="YoutubeIframe"
            />
        </>
    );
};

export default YoutubeCard;
