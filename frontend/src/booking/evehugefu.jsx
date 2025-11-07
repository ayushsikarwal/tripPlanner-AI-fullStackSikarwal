// const createMarkup = (htmlContent) => {
//     return {
//       __html: htmlContent
//       .replace(/<p>\s*HeadLine\s*:/g, "<p><strong>HeadLine:</strong>")
//       .replace(/<p>\s*Location\s*:/g, "<p><strong>Location:</strong>")
//       .replace(/<p>\s*Rooms\s*:/g, "<p><strong>Rooms:</strong>")
//       .replace(/<p>\s*Dining\s*:/g, "<p><strong>Dining:</strong>")
//       .replace(/<p>\s*Renovations\s*:/g, "<p><strong>Renovations:</strong>")
//       .replace(/<p>\s*CheckIn Instructions\s*:/g, "<p><strong>Check-In Instructions:</strong></p>")
//       .replace(/<p>\s*Special Instructions\s*:/g, "<p><strong>Special Instructions:</strong>")
  
//       // Ensure <ul> does not have a <p> around it
//       .replace(/<\/p>\s*<ul>/g, "<ul>") // Removes ending </p> before <ul>
//       .replace(/<\/ul>\s*<p>/g, "</ul>") // Removes starting <p> after </ul>
  
//       // Remove <p> wrapping <ul> for check-in instructions
//       .replace(/<p>\s*<ul>/g, "<ul>")
//       .replace(/<\/ul>\s*<\/p>/g, "</ul>")
//     };
//   };


//   dangerouslySetInnerHTML={{
//     __html: hotel.Attractions["1) "]
//       .replace(/<\/?p>/g, "") // Remove <p> tags
//       .replace(/<br\s*\/?>/g, "</li><li>") // Replace <br> with closing and opening <li>
//       .replace(
//         /Distances are displayed to the nearest 0.1 mile and kilometer./g,
//         "<strong>Distances are displayed to the nearest 0.1 mile and kilometer.</strong>"
//       ) // Keep the heading
//       .replace(/<li><\/li>/g, "") // Remove empty <li> elements
//       .trim(),
//   }}