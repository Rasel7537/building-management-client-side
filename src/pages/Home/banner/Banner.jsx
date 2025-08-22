import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import bannerImg1 from "../../../assets/banner-1.jpg";
import bannerImg2 from "../../../assets/banner-2.jpg";
import bannerImg3 from "../../../assets/banner-3.jpg";
import bannerImg4 from "../../../assets/banner-4.jpg";
import bannerImg5 from "../../../assets/banner-5.jpg";
import bannerImg6 from "../../../assets/banner-6.jpg";
import bannerImg7 from "../../../assets/banner-7.jpg";
import bannerImg8 from "../../../assets/banner-8.jpg";

const Banner = () => {
  return (
    <div className="mt-5">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={1000}
      >
        {[bannerImg1, bannerImg2, bannerImg3, bannerImg4, bannerImg5, bannerImg6, bannerImg7, bannerImg8].map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Apartment ${index + 1}`} className="h-[500px] w-full object-cover" />
            
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
