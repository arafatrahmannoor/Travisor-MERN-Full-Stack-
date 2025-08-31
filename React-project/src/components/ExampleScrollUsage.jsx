// Example usage of scroll utilities in components

import { useScrollToTop, useScrollToElement, scrollToTop } from '../hooks/useScrollToTop';

const ExampleComponent = () => {
  // Automatically scroll to top when this component mounts or route changes
  useScrollToTop(true); // with smooth scrolling

  // Get function to scroll to specific element
  const scrollToSection = useScrollToElement('features-section', true);

  const handleManualScrollToTop = () => {
    scrollToTop(true); // Manual scroll to top with smooth animation
  };

  return (
    <div>
      <h1>My Page</h1>
      
      {/* Button to manually scroll to top */}
      <button onClick={handleManualScrollToTop}>
        Go to Top
      </button>
      
      {/* Button to scroll to specific section */}
      <button onClick={scrollToSection}>
        Go to Features
      </button>
      
      {/* Some content */}
      <div style={{ height: '1000px' }}>
        <p>Lots of content here...</p>
      </div>
      
      {/* Section to scroll to */}
      <section id="features-section">
        <h2>Features Section</h2>
        <p>This is the features section</p>
      </section>
    </div>
  );
};

export default ExampleComponent;
