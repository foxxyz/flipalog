<?php

// Max pages
$maxPages = 8;

// Page sizes
$pageWidth = 500;
$pageHeight = 647;
$pageWidthFull = 1088;
$pageHeightFull = 1463;

// Self URL
$catURL = "http://" . $_SERVER["SERVER_NAME"] . reset(explode("?", $_SERVER["REQUEST_URI"])) . "?";

// Set page via querystring
if (isset($_GET["page"]) && is_numeric($_GET["page"]) && $_GET["page"] <= $maxPages) $page = $_GET["page"];
else $page = 0;
if ($page % 2 == 1) $page--;
 
 // Force legacy/enhanced version
 $classes = array('enhanced');
 if ($page == 0) $classes[] = "start";
 if (isset($_GET["enhanced"])) {
 	if ($_GET["enhanced"] == "true") $classes[] = "enhanced";
 	else $classes[] = "normal";
 	$classes[] = "forced";
 	$catURL .= "enhanced=" . $_GET["enhanced"];
}

?><!DOCTYPE html>
<html>

	<head>
		<title>Flipalog!</title>
		<meta charset="utf-8" />
		<meta name="author" content="Ivo Janssen, Code Dealers" />
		<link href="http://fonts.googleapis.com/css?family=Oxygen:300|Open+Sans:300" rel="stylesheet" type="text/css">
		<link href="css/compiled/style.css" rel="stylesheet" type="text/css">
		<!--[if IE]><link rel="stylesheet" type="text/css" media="screen" href="css/compiled/exploder.css"><![endif]-->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
		<script src="main.js"></script>
		<script type="text/javascript">
			var currentPage = <?= $page ?>,
			    numPages = <?= $maxPages ?>,
			    pageWidth = <?= $pageWidth ?>,
			    pageHeight = <?= $pageHeight ?>;	
		</script>
	</head>
	<body<?= $classes ? " class=\"" . implode(" ", $classes) . "\"" : null ?>>
		
		<div id="wrapper">

			<a target="_parent" href="<?= $catURL ?>">
				<h1>Flipalog!</h1>
				<h2>CSS Flip Catalog with 3D Transforms</h2>
			</a>
			
			<div id="catalog">
				<?php
				// Dynamic loading solution if catalog consists of only images
				/*
				for($pageOffset = -4; $pageOffset <= 6; $pageOffset += 2) {
					if ($pageOffset <= 0 && $page <= 0 - $pageOffset) continue;
					if ($pageOffset > 0 && $page > ($maxPages - $pageOffset)) continue;
					?>
					<div class="page<?= $pageOffset <= 0 ? " flipped" : null ?>">
						<div class="front">
							<a href="images/page<?= $page + $pageOffset - 1 ?>-big.jpg"><img src="images/page<?= $page + $pageOffset - 1 ?>.jpg" width="<?= $pageWidth ?>" height="<?= $pageHeight ?>" alt="Page<?= $page + $pageOffset - 1 ?>" /></a>
						</div>
						<div class="back">
							<a href="images/page<?= $page + $pageOffset ?>-big.jpg"><img src="images/page<?= $page + $pageOffset ?>.jpg" width="<?= $pageWidth ?>" height="<?= $pageHeight ?>" alt="Page<?= $page + $pageOffset ?>" /></a>
						</div>
					</div>
					<?php
				}*/
				// Custom solution if catalog consists of mixed HTML content
				?>
				<div class="page<?= $page > 0 ? " flipped" : null ?>">
					<div class="front">
						<a href="images/page1-big.jpg"><img src="images/page1.jpg" width="<?= $pageWidth ?>" height="<?= $pageHeight ?>" alt="Page1" /></a>
					</div>
					<div class="back">
						<a href="images/page2-big.jpg"><img src="images/page2.jpg" width="<?= $pageWidth ?>" height="<?= $pageHeight ?>" alt="Page2" /></a>
					</div>
				</div>
				<div class="page<?= $page > 2 ? " flipped" : null ?>">
					<div class="front">
						<a href="images/page3-big.jpg"><img src="images/page3.jpg" width="<?= $pageWidth ?>" height="<?= $pageHeight ?>" alt="Page3" /></a>
					</div>
					<div id="custompage1" class="back">
						<p>Some content here</p>
					</div>
				</div>
				<div class="page<?= $page > 4 ? " flipped" : null ?>">
					<div id="custompage2" class="front">
						<p>Other content here</p>
					</div>
					<div class="back">
						<a href="images/page6-big.jpg"><img src="images/page6.jpg" width="<?= $pageWidth ?>" height="<?= $pageHeight ?>" alt="Page6" /></a>
					</div>
				</div>
				<div class="page<?= $page > 6 ? " flipped" : null ?>">
					<div class="front">
						<a href="images/page7-big.jpg"><img src="images/page7.jpg" width="<?= $pageWidth ?>" height="<?= $pageHeight ?>" alt="Page7" /></a>
					</div>
					<div id="custompage3" class="back">
						<p>Fin.</p>
					</div>
				</div>
				<div id="navigation">
					<span title="Previous Page" class="prev"<?= $page == 0 ? " style=\"display:none;\"" : null ?>>Prev Page</span>
					<span title="Next Page" class="next"<?= $page == $maxPages ? " style=\"display:none;\"" : null ?>>Next Page</span>
				</div>
			</div>
			
			<footer>
				<ul id="sections">
					<li class="front"><a title="Skip to Front" href="<?= $catURL ?>">Front Cover</a></li>
					<li><a title="Skip to A Cool Section" href="<?= $catURL ?>&page=4">A Cool Section</a></li>
					<li class="back"><a title="Skip to Back" href="<?= $catURL ?>&page=<?= $maxPages ?>">Back Cover</a></li>
				</ul>
			</footer>
		</div>
		
	</body>
</html>