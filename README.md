Flipalog
========

Lightweight CSS Flip Catalog with 3D Transforms

Prerequisites
-------------

* PHP4+ 
* SASS & Compass

For image processing GD support is required.

Usage
-----

1. Clone the repository
2. Replace the `example` images in the `/process/` directory with images of your choice - ensure they are numbered according to the page they are on, starting with 1
3. Modify `index.php` and `processImages.php`, replacing the `$pageWidth`, `$pageHeight`, `$fullWidth` & `$fullHeight` variables with the dimensions you need your flipbook to be. Also replace the `$maxPages` variable with the amount of pages in your flipbook.
4. Run `php processImages.php`. You should now have processed images ready to go in the `/images/` directory.
5. Modify the styles in `css/sass/` to your liking and compile them with SASS
6. Done!

