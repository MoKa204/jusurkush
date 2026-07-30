<?php
/**
 * The Template for displaying all single products
 *
 * @package WooCommerce\Templates
 * @version 1.6.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header( 'shop' ); 

do_action( 'woocommerce_before_main_content' );
?>
<div class="page-container container" style="max-width: 1200px; padding: 40px 16px;">
	<?php while ( have_posts() ) : ?>
		<?php the_post(); ?>
		<?php wc_get_template_part( 'content', 'single-product' ); ?>
	<?php endwhile; // end of the loop. ?>
</div>
<?php
do_action( 'woocommerce_after_main_content' );
get_footer( 'shop' );
