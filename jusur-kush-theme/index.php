<?php
/**
 * The main template file
 *
 * @package Jusur Kush
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

// In case this file is loaded outside of a full WordPress environment
// guard calls to WP template functions to avoid fatal errors in static analysis
if ( function_exists( 'get_header' ) ) {
	get_header();
} else {
	// Fallback: try to include a header.php if present
	$header_path = __DIR__ . '/header.php';
	if ( file_exists( $header_path ) ) {
		include $header_path;
	}
}
?>

<div class="page-container container">
	<?php if ( function_exists( 'is_home' ) && function_exists( 'is_front_page' ) && is_home() && ! is_front_page() ) : ?>
	<?php endif; ?>
	
	<div class="page-content">
	<?php
	if (
		function_exists( 'have_posts' ) &&
		function_exists( 'the_post' ) &&
		function_exists( 'the_ID' ) &&
		function_exists( 'post_class' ) &&
		function_exists( 'the_title' ) &&
		function_exists( 'esc_url' ) &&
		function_exists( 'get_permalink' ) &&
		function_exists( 'has_post_thumbnail' ) &&
		function_exists( 'the_post_thumbnail' ) &&
		function_exists( 'the_excerpt' ) &&
		function_exists( '__' ) &&
		function_exists( 'the_posts_navigation' ) &&
		function_exists( 'esc_html_e' )
	) :
		if ( have_posts() ) :
			while ( have_posts() ) : the_post(); ?>
				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<header class="entry-header">
						<?php the_title( '<h2 class="entry-title page-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' ); ?>
					</header>
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="post-thumbnail" style="margin-bottom: 20px;"><?php the_post_thumbnail( 'large' ); ?></div>
					<?php endif; ?>
					<div class="entry-content">
						<?php
						the_excerpt();
						echo '<a href="' . esc_url( get_permalink() ) . '" class="btn-outline" style="color: var(--brand-dark); border-color: var(--brand-dark);">' . __( 'Read More', 'jusur-kush' ) . '</a>';
						?>
					</div>
				</article>
				<hr style="margin: 40px 0; border: 0; border-top: 1px solid var(--border);" />
			<?php endwhile;
			the_posts_navigation();
		else : ?>
			<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'jusur-kush' ); ?></p>
		<?php endif;
	else : ?>
		<p>WordPress functions are not available.</p>
	<?php endif; ?>
	</div>
</div>

<?php
if ( function_exists( 'get_footer' ) ) {
	get_footer();
} else {
	$footer_path = __DIR__ . '/footer.php';
	if ( file_exists( $footer_path ) ) {
		include $footer_path;
	}
}
