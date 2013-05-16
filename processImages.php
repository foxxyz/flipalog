<?php

	// processImages.php
	//
	// Custom script to convert catalog images to agreed format
	// Author: tivo
	
	// Path define
	$rawPath = dirname(__FILE__) . "/process/";
	$imagePath = dirname(__FILE__) . "/images/";
	
	// Size of pages
	$pageWidth = 500;
	$pageHeight = 672;
	$fullWidth = 1088;
	$fullHeight = 1463;
		
	print "Processing images...\n";
	
	// Open directory
	$rawDir = opendir($rawPath);
	// Loop through files and determine page number
	while(false !== ($rawImage = readdir($rawDir))) {
		// Make sure it's a file and a jpg
		if (is_file($rawPath . $rawImage) && preg_match("%\.(png|jpg)$%i", $rawImage, $matches)) {

			// Get extension
			$extension = $matches[1];

			// Check for number before the extension
			if (preg_match("%([0-9]+)\.(png|jpg)$%i", $rawImage, $matches)) $pageNumber = intval($matches[1]);
			else $pageNumber = 1;
			
			print "Copying page " . $pageNumber . "\n";
			
			// Re-save the big file to the good directory
			$sourceImage = $extension == 'png' ? imagecreatefrompng($rawPath . $rawImage) : imagecreatefromjpeg($rawPath . $rawImage);
			$pageImage = imagecreatetruecolor($fullWidth, $fullHeight);
			imagecopyresampled($pageImage, $sourceImage, 0, 0, 0, 0, $fullWidth, $fullHeight, imagesx($sourceImage), imagesy($sourceImage));
			$result = imagejpeg($sourceImage, $imagePath . "page" . $pageNumber . "-big.jpg", 70);
			
			print "Resizing page " . $pageNumber . "\n";
			
			// Resize the image
			$sourceImage = $extension == 'png' ? imagecreatefrompng($rawPath . $rawImage) : imagecreatefromjpeg($rawPath . $rawImage);
			$pageImage = imagecreatetruecolor($pageWidth, $pageHeight);
			imagecopyresampled($pageImage, $sourceImage, 0, 0, 0, 0, $pageWidth, $pageHeight, imagesx($sourceImage), imagesy($sourceImage));
			$result = imagejpeg($pageImage, $imagePath . "page" . $pageNumber . ".jpg", 85);
		}
	}
	
	print "Done!\n";
	
?>