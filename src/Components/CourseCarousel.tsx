import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { FC, useRef } from "react";
import { AppState } from "../redux/store";
import { connect, ConnectedProps } from "react-redux";
import { allCoursesMapSelector } from "../redux/selectors/courseSelector";

interface CourseCarouselProps extends ReduxProps {}

const CourseCarousel: FC<CourseCarouselProps> = ({ courses }) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <div className="max-w-5xl mx-auto my-7 p-0.5 rounded-xl bg-linear-to-r from-blue-400 to-indigo-500">
      <div className="bg-white rounded-xl p-6">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper: SwiperClass) => (swiperRef.current = swiper)}
        >
          {courses.map((course) => (
            <SwiperSlide
              key={course.id}
              className="coupon-slide flex flex-col items-center cursor-pointer rounded-md mb-4"
            >
              <div className="h-40 bg-linear-to-br from-orange-200 to-yellow-200 rounded-md mb-4 flex items-center justify-center text-orange-600 font-semibold text-lg">
                <span className="text-center">{course.title}</span>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {course.title}
              </h2>
              <p className="text-gray-600 text-sm grow text-center">
                {course.description?.slice(0, 100) ||
                  "No description provided."}
              </p>

              <div className="mt-4 text-center text-orange-600 font-semibold text-lg">
                Instructor: {course.instructorName}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Scoped styles for slide widths */}
        <style>{`
        .coupon-slide {
          width: 66%;
          transition: transform 0.3s ease;
          cursor: pointer;
        }
        .swiper-slide-active.coupon-slide {
          transform: scale(1.05);
          z-index: 10;
        }
      `}</style>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  courses: allCoursesMapSelector(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CourseCarousel);
