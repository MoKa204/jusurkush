<?php
/**
 * The template for displaying the front page
 *
 * @package Jusur Kush
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header();
?>

	<section class="hero">
		<div class="container hero-inner">
			<div class="hero-text">
				<div class="hero-pill">🇸🇩 <?php esc_html_e( 'Sudan\'s Startup Marketplace', 'jusur-kush' ); ?></div>
				<h1>
					<?php 
					$hero_title = get_theme_mod( 'hero_title', __( 'Jusur Kush', 'jusur-kush' ) );
					echo wp_kses_post( $hero_title ); 
					?>
				</h1>
				<p>
					<?php 
					$hero_subtitle = get_theme_mod( 'hero_subtitle', __( 'Bridging Sudanese startup businesses with customers. Discover authentic handmade goods, traditional crafts, and local products from across Sudan.', 'jusur-kush' ) );
					echo esc_html( $hero_subtitle ); 
					?>
				</p>
				<div class="hero-cta">
					<?php if ( class_exists( 'WooCommerce' ) ) : ?>
						<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="btn-primary"><?php esc_html_e( 'Shop Now →', 'jusur-kush' ); ?></a>
					<?php endif; ?>
					<a href="<?php echo esc_url( home_url( '/register' ) ); ?>" class="btn-outline"><?php esc_html_e( 'Start Selling', 'jusur-kush' ); ?></a>
				</div>
				<div class="hero-stats">
					<div class="text-center">
						<div class="stat-value">500+</div>
						<div class="stat-label"><?php esc_html_e( 'Sellers', 'jusur-kush' ); ?></div>
					</div>
					<div class="text-center">
						<div class="stat-value">2,000+</div>
						<div class="stat-label"><?php esc_html_e( 'Products', 'jusur-kush' ); ?></div>
					</div>
					<div class="text-center">
						<div class="stat-value">15,000+</div>
						<div class="stat-label"><?php esc_html_e( 'Customers', 'jusur-kush' ); ?></div>
					</div>
				</div>
			</div>
			<div class="hero-grid">
				<a href="<?php echo class_exists( 'WooCommerce' ) ? esc_url( wc_get_page_permalink( 'shop' ) ) : '#'; ?>">
					<img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80" alt="<?php esc_attr_e( 'Handmade crafts', 'jusur-kush' ); ?>" />
				</a>
				<a href="<?php echo class_exists( 'WooCommerce' ) ? esc_url( wc_get_page_permalink( 'shop' ) ) : '#'; ?>">
					<img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80" alt="<?php esc_attr_e( 'Local food', 'jusur-kush' ); ?>" />
				</a>
				<a href="<?php echo class_exists( 'WooCommerce' ) ? esc_url( wc_get_page_permalink( 'shop' ) ) : '#'; ?>">
					<img src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&q=80" alt="<?php esc_attr_e( 'Textiles', 'jusur-kush' ); ?>" />
				</a>
				<a href="<?php echo class_exists( 'WooCommerce' ) ? esc_url( wc_get_page_permalink( 'shop' ) ) : '#'; ?>">
					<img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80" alt="<?php esc_attr_e( 'Jewelry', 'jusur-kush' ); ?>" />
				</a>
			</div>
		</div>
		<div class="hero-wave">
			<svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
				<path d="M0 40 Q360 0 720 20 Q1080 40 1440 10 L1440 40 Z" fill="#F5F0E8" />
			</svg>
		</div>
	</section>

	<section class="trust">
		<div class="container trust-grid">
			<div class="trust-item"><div class="trust-icon">🚚</div><div><div class="trust-title"><?php esc_html_e( 'Fast Delivery', 'jusur-kush' ); ?></div><div class="trust-desc"><?php esc_html_e( 'Across all Sudan states', 'jusur-kush' ); ?></div></div></div>
			<div class="trust-item"><div class="trust-icon">🛡</div><div><div class="trust-title"><?php esc_html_e( 'Buyer Protection', 'jusur-kush' ); ?></div><div class="trust-desc"><?php esc_html_e( '100% secure payments', 'jusur-kush' ); ?></div></div></div>
			<div class="trust-item"><div class="trust-icon">💳</div><div><div class="trust-title"><?php esc_html_e( 'Easy Payments', 'jusur-kush' ); ?></div><div class="trust-desc"><?php esc_html_e( 'SDG, Mobile Money & more', 'jusur-kush' ); ?></div></div></div>
			<div class="trust-item"><div class="trust-icon">👥</div><div><div class="trust-title"><?php esc_html_e( 'Local Support', 'jusur-kush' ); ?></div><div class="trust-desc"><?php esc_html_e( '24/7 Arabic & English', 'jusur-kush' ); ?></div></div></div>
		</div>
	</section>

	<?php if ( class_exists( 'WooCommerce' ) ) : ?>
	<section class="categories">
		<div class="container">
			<div class="section-header">
				<div><h2><?php esc_html_e( 'Shop by Category', 'jusur-kush' ); ?></h2><p><?php esc_html_e( 'Find what you\'re looking for', 'jusur-kush' ); ?></p></div>
				<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="view-all"><?php esc_html_e( 'View All →', 'jusur-kush' ); ?></a>
			</div>
			<div class="cat-grid">
				<?php
				$product_categories = get_terms( array( 'taxonomy' => 'product_cat', 'hide_empty' => false, 'number' => 8 ) );
				$default_icons = array( '🧶', '🍯', '👗', '💍', '📱', '🌾', '🏠', '🎨' );
				if ( ! empty( $product_categories ) && ! is_wp_error( $product_categories ) ) {
					foreach ( $product_categories as $index => $category ) {
						$icon = isset( $default_icons[$index % count($default_icons)] ) ? $default_icons[$index % count($default_icons)] : '🛍';
						?>
						<a href="<?php echo esc_url( get_term_link( $category ) ); ?>" class="cat-card">
							<div class="cat-icon"><?php echo esc_html( $icon ); ?></div>
							<div class="cat-label"><?php echo esc_html( $category->name ); ?></div>
						</a>
						<?php
					}
				}
				?>
			</div>
		</div>
	</section>

	<section class="products-section">
		<div class="container">
			<div class="section-header">
				<div><h2>📈 <?php esc_html_e( 'Featured Products', 'jusur-kush' ); ?></h2><p><?php esc_html_e( 'Top picks from Sudanese sellers', 'jusur-kush' ); ?></p></div>
				<a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>" class="view-all"><?php esc_html_e( 'View All →', 'jusur-kush' ); ?></a>
			</div>
			<div class="product-grid">
				<?php
				$args = array( 'post_type' => 'product', 'posts_per_page' => 8, 'meta_key' => '_featured', 'meta_value' => 'yes' );
				$featured_query = new WP_Query( $args );
				if ( ! $featured_query->have_posts() ) {
					$args['meta_key'] = ''; $args['meta_value'] = ''; $featured_query = new WP_Query( $args );
				}
				if ( $featured_query->have_posts() ) :
					while ( $featured_query->have_posts() ) : $featured_query->the_post(); global $product; ?>
						<a href="<?php the_permalink(); ?>" class="product-card">
							<div class="product-img-wrap">
								<?php 
								if ( has_post_thumbnail() ) { the_post_thumbnail( 'woocommerce_thumbnail' ); } else { echo '<img src="' . esc_url( wc_placeholder_img_src() ) . '" alt="' . esc_attr__( 'Placeholder', 'jusur-kush' ) . '" />'; }
								if ( $product->is_on_sale() ) : ?><span class="product-badge"><?php esc_html_e( 'Sale', 'jusur-kush' ); ?></span><?php endif; ?>
								<button class="product-wishlist" onclick="event.preventDefault()">♡</button>
							</div>
							<div class="product-info">
								<div class="product-seller"><?php echo esc_html( get_the_author() ); ?></div>
								<div class="product-name"><?php the_title(); ?></div>
								<div class="product-stars">
									<?php
									$rating_count = $product->get_rating_count();
									$average = $product->get_average_rating();
									if ( $rating_count > 0 ) :
										for ( $i = 1; $i <= 5; $i++ ) { if ( $i <= $average ) { echo '<span class="star">★</span>'; } else { echo '<span class="star" style="color:#D4C8B0">★</span>'; } }
										echo '<span class="star-count">(' . esc_html( $rating_count ) . ')</span>';
									else : echo '<span class="star-count">' . esc_html__( 'No ratings yet', 'jusur-kush' ) . '</span>'; endif;
									?>
								</div>
								<div class="product-footer">
									<div><?php if ( $price_html = $product->get_price_html() ) : ?><div class="product-price"><?php echo wp_kses_post( $price_html ); ?></div><?php endif; ?></div>
									<button class="add-cart-btn" onclick="event.preventDefault(); window.location.href='<?php echo esc_url( $product->add_to_cart_url() ); ?>'">+</button>
								</div>
							</div>
						</a>
						<?php
					endwhile; wp_reset_postdata();
				endif;
				?>
			</div>
		</div>
	</section>
	<?php endif; ?>

	<section class="loan-section">
		<div class="container">
			<div class="loan-banner">
				<div class="loan-inner">
					<div class="loan-text">
						<div class="loan-icon">💰</div>
						<h2><?php esc_html_e( 'Grow Your Business with Jusur Kush', 'jusur-kush' ); ?></h2>
						<p><?php esc_html_e( 'Get access to micro-loans tailored for Sudanese artisans and startups. Expand your inventory, upgrade your tools, and reach more customers.', 'jusur-kush' ); ?></p>
						<a href="<?php echo esc_url( home_url( '/loan' ) ); ?>" class="btn-outline"><?php esc_html_e( 'Apply for a Loan', 'jusur-kush' ); ?></a>
					</div>
					<div class="loan-stats">
						<div class="loan-stat"><div class="loan-stat-value">Up to 5M SDG</div><div class="loan-stat-label"><?php esc_html_e( 'Loan Amount', 'jusur-kush' ); ?></div></div>
						<div class="loan-stat"><div class="loan-stat-value">0%</div><div class="loan-stat-label"><?php esc_html_e( 'Interest (Islamic)', 'jusur-kush' ); ?></div></div>
						<div class="loan-stat"><div class="loan-stat-value">48 Hours</div><div class="loan-stat-label"><?php esc_html_e( 'Approval Time', 'jusur-kush' ); ?></div></div>
						<div class="loan-stat"><div class="loan-stat-value">6-12 Months</div><div class="loan-stat-label"><?php esc_html_e( 'Repayment Period', 'jusur-kush' ); ?></div></div>
					</div>
				</div>
			</div>
		</div>
	</section>

<?php
get_footer();
