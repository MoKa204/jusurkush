<?php
/**
 * The header for our theme
 *
 * @package Jusur Kush
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header class="site-header">
	<div class="container header-inner">
		
		<!-- 1. Logo -->
		<div class="header-brand">
			<?php if ( has_custom_logo() ) : ?>
				<div class="site-logo"><?php the_custom_logo(); ?></div>
			<?php else : ?>
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="logo">
					<?php bloginfo( 'name' ); ?>
					<span><?php bloginfo( 'description' ); ?></span>
				</a>
			<?php endif; ?>
		</div>

		<!-- 2. Search Bar -->
		<div class="header-search">
			<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
				<input type="search" class="search-field" placeholder="<?php echo esc_attr_x( 'Search products, sellers…', 'placeholder', 'jusur-kush' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
				<?php if ( class_exists( 'WooCommerce' ) ) : ?>
					<input type="hidden" name="post_type" value="product" />
				<?php endif; ?>
				<button type="submit" aria-label="Search">🔍</button>
			</form>
		</div>

		<!-- 3. Desktop Navigation -->
		<nav class="desktop-nav">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu( array(
					'theme_location' => 'primary',
					'menu_id'        => 'primary-menu',
					'container'      => false,
					'fallback_cb'    => false,
				) );
			} else {
				?>
				<ul class="nav-links">
					<?php if ( class_exists( 'WooCommerce' ) ) : ?>
						<li><a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Products', 'jusur-kush' ); ?></a></li>
						<li><a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>"><?php esc_html_e( 'My Account', 'jusur-kush' ); ?></a></li>
					<?php else : ?>
						<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'jusur-kush' ); ?></a></li>
					<?php endif; ?>
				</ul>
				<?php
			}
			?>
		</nav>
		
		<!-- 4. Header Actions (Cart & Hamburger) -->
		<div class="header-actions">
			<?php if ( class_exists( 'WooCommerce' ) ) : ?>
				<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="nav-icon cart-icon" title="<?php esc_attr_e( 'View your shopping cart', 'jusur-kush' ); ?>">
					<span aria-hidden="true">🛒</span>
					<?php if ( ! is_null( WC()->cart ) ) : ?>
						<span class="badge"><?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?></span>
					<?php endif; ?>
				</a>
			<?php endif; ?>

			<button class="menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="mobileSidebar" aria-label="Open Menu">
				<span class="hamburger-box">
					<span class="hamburger-inner"></span>
				</span>
			</button>
		</div>

	</div>
</header>

<!-- 5. Mobile Sidebar & Overlay -->
<div class="menu-overlay" id="menuOverlay" aria-hidden="true"></div>
<aside class="mobile-sidebar" id="mobileSidebar" aria-hidden="true">
	<div class="sidebar-header">
		<span class="sidebar-title"><?php esc_html_e( 'Menu', 'jusur-kush' ); ?></span>
		<button class="menu-close" id="menuClose" aria-label="Close Menu">✕</button>
	</div>
	<nav class="sidebar-nav">
		<?php
		if ( has_nav_menu( 'primary' ) ) {
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'menu_id'        => 'mobile-primary-menu',
				'menu_class'     => 'nav-menu',
				'container'      => false,
				'fallback_cb'    => false,
			) );
		} else {
			?>
			<ul class="nav-menu">
				<?php if ( class_exists( 'WooCommerce' ) ) : ?>
					<li><a href="<?php echo esc_url( wc_get_page_permalink( 'shop' ) ); ?>"><?php esc_html_e( 'Products', 'jusur-kush' ); ?></a></li>
					<li><a href="<?php echo esc_url( wc_get_page_permalink( 'myaccount' ) ); ?>"><?php esc_html_e( 'My Account', 'jusur-kush' ); ?></a></li>
				<?php else : ?>
					<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'jusur-kush' ); ?></a></li>
				<?php endif; ?>
			</ul>
			<?php
		}
		?>
	</nav>
</aside>
