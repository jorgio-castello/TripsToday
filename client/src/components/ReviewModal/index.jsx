import React from 'react';
import PropTypes from 'prop-types';

import { CSSTransition } from 'react-transition-group';

// Child Components
import ContainerLeft from './Containers/ContainerLeft';
import ContainerRight from './Containers/ContainerRight';
import Review from './childComponents/Review';
import ReviewSlider from './childComponents/ReviewSlider';

// CSS styling
import ReviewModalCSS from '../../style/ReviewModal.css';

// AWS links' data
import awsS3Links from '../../../../AmazonS3Links';
// Destructure baseurl from AWS links
const { awsBaseUrl } = awsS3Links;

// -------------------------------------------------------------------------------------------------
class ReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReviewSlider: false,
    };
    this.displayReviewSlider = this.displayReviewSlider.bind(this);
    this.hideReviewSlider = this.hideReviewSlider.bind(this);
  }

  componentDidMount() {
    this.setState({
      showReviewSlider: false,
    });
  }

  componentWillUnmount() {}

  displayReviewSlider() {
    this.setState({
      showReviewSlider: true,
    });
  }

  hideReviewSlider() {
    this.setState({
      showReviewSlider: false,
    });
  }

  render() {
    const {
      photos, activePhotoIdx, // array of photos, and the active photoIdx
      handleImageSliderClick, showGalleryModal, // Event handlers
    } = this.props;
    const { showReviewSlider } = this.state;
    const activePhoto = photos[activePhotoIdx];

    return (
      <>
        <div className={ReviewModalCSS.container}>

          <ContainerLeft // Contains buttons on left-side of the ReviewModal component
            showGalleryModal={showGalleryModal}
            handleImageSliderClick={handleImageSliderClick}
          />

          {/* Primary content of the page: current image */}
          <img
            className={ReviewModalCSS.image}
            alt={activePhoto.alt}
            src={`${awsBaseUrl}/${activePhoto.link}`}
          />

          {/* Contains information / buttons on right-side of the ReviewModal component */}
          <ContainerRight
            activePhotoIdx={Number(activePhotoIdx)}
            photos={photos}
            handleImageSliderClick={handleImageSliderClick}
          />

          {/* Displays relevant information about the review associated with this phot */}
          <div className={ReviewModalCSS.reviewComponent}>
            <Review
              photos={photos}
              activePhotoIdx={activePhotoIdx}
              displayReviewSlider={this.displayReviewSlider}
            />
          </div>

          {/* { showReviewSlider ? ( */}
          <CSSTransition
            in={showReviewSlider}
            timeout={300}
            classNames={{
              enter: ReviewModalCSS['slider-enter'],
              enterActive: ReviewModalCSS['slider-enter-active'],
              exit: ReviewModalCSS['slider-exit'],
              exitActive: ReviewModalCSS['slider-exit-active'],
            }}
            mountOnEnter
            unmountOnExit
          >
            <ReviewSlider
              photos={photos}
              activePhotoIdx={activePhotoIdx}
              hideReviewSlider={this.hideReviewSlider}
            />
          </CSSTransition>
          {/* )
            : <div />} */}
        </div>
      </>
    );
  }
};

ReviewModal.defaultProps = {};

ReviewModal.propTypes = {};

export default ReviewModal;
