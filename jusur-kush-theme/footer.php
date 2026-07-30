<?php
/**
 * The template for displaying the footer
 *
 * @package Jusur Kush
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>

<footer class="site-footer">
	<div class="container">
		<div class="footer-grid">
			<div class="footer-brand">
				<h3><?php bloginfo( 'name' ); ?></h3>
				<p><?php bloginfo( 'description' ); ?></p>
			</div>
			<div class="footer-col">
				<h4><?php esc_html_e( 'Quick Links', 'jusur-kush' ); ?></h4>
				<?php
				if ( has_nav_menu( 'footer' ) ) {
					wp_nav_menu( array( 'theme_location' => 'footer', 'menu_id' => 'footer-menu', 'container' => false, 'fallback_cb' => false ) );
				} else {
					?>
					<ul>
						<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'jusur-kush' ); ?></a></li>
						<?php if ( class_exists( 'WooCommerce' ) ) : ?>
							<li><a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Products', 'jusur-kush' ); ?></a></li>
						<?php endif; ?>
					</ul>
					<?php
				}
				?>
			</div>
			<div class="footer-col">
				<h4><?php esc_html_e( 'Support', 'jusur-kush' ); ?></h4>
				<ul>
					<li><a href="#"><?php esc_html_e( 'Help Center', 'jusur-kush' ); ?></a></li>
					<li><a href="#"><?php esc_html_e( 'Shipping Policy', 'jusur-kush' ); ?></a></li>
					<li><a href="#"><?php esc_html_e( 'Returns & Refunds', 'jusur-kush' ); ?></a></li>
				</ul>
			</div>
			<div class="footer-col">
				<h4><?php esc_html_e( 'Contact', 'jusur-kush' ); ?></h4>
				<ul>
					<li><a href="#"><?php esc_html_e( 'Email Us', 'jusur-kush' ); ?></a></li>
					<li><a href="#"><?php esc_html_e( 'WhatsApp', 'jusur-kush' ); ?></a></li>
				</ul>
			</div>
		</div>
		<div class="footer-bottom">
			<p>
				<?php 
				$copyright_text = get_theme_mod( 'footer_copyright_text', __( '© Jusur Kush. All rights reserved.', 'jusur-kush' ) );
				echo esc_html( $copyright_text ); 
				?>
			</p>
			<p><?php esc_html_e( 'Made with ❤️ for Sudan', 'jusur-kush' ); ?></p>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
