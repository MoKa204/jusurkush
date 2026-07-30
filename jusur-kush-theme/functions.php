<?php
/**
 * Jusur Kush functions and definitions
 *
 * @package Jusur Kush
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

if ( ! defined( 'JUSUR_KUSH_VERSION' ) ) {
	define( 'JUSUR_KUSH_VERSION', '1.0.5' );
}

/**
 * Theme Setup
 */
function jusur_kush_setup() {
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );

	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'jusur-kush' ),
		'footer'  => esc_html__( 'Footer Menu', 'jusur-kush' ),
	) );

	add_theme_support( 'custom-logo', array(
		'height'      => 250,
		'width'       => 250,
		'flex-width'  => true,
		'flex-height' => true,
	) );

	// WooCommerce Support
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'jusur_kush_setup' );

/**
 * Enqueue scripts and styles.
 */
function jusur_kush_scripts() {
	// Styles
	wp_enqueue_style( 'jusur-kush-style', get_stylesheet_uri(), array(), JUSUR_KUSH_VERSION );
	wp_enqueue_style( 'jusur-kush-main', get_template_directory_uri() . '/assets/css/main.css', array(), JUSUR_KUSH_VERSION );
	
	if ( class_exists( 'WooCommerce' ) ) {
		wp_enqueue_style( 'jusur-kush-woocommerce', get_template_directory_uri() . '/assets/css/woocommerce.css', array(), JUSUR_KUSH_VERSION );
	}

	// Scripts
	wp_enqueue_script( 'jusur-kush-main-js', get_template_directory_uri() . '/assets/js/main.js', array(), JUSUR_KUSH_VERSION, true );
	
	if ( class_exists( 'WooCommerce' ) ) {
		wp_enqueue_script( 'jusur-kush-woocommerce-js', get_template_directory_uri() . '/assets/js/woocommerce.js', array( 'jquery' ), JUSUR_KUSH_VERSION, true );
	}

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'jusur_kush_scripts' );

/**
 * Add Customizer settings.
 */
function jusur_kush_customize_register( $wp_customize ) {
	// Colors
	$wp_customize->add_setting( 'primary_color', array( 'default' => '#7C5C3A', 'sanitize_callback' => 'sanitize_hex_color' ) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'primary_color', array(
		'label'    => __( 'Primary Brand Color', 'jusur-kush' ),
		'section'  => 'colors',
	) ) );

	$wp_customize->add_setting( 'secondary_color', array( 'default' => '#A0744A', 'sanitize_callback' => 'sanitize_hex_color' ) );
	$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'secondary_color', array(
		'label'    => __( 'Secondary Brand Color', 'jusur-kush' ),
		'section'  => 'colors',
	) ) );

	// Hero Section
	$wp_customize->add_section( 'hero_section', array( 'title' => __( 'Hero Banner', 'jusur-kush' ), 'priority' => 30 ) );
	
	$wp_customize->add_setting( 'hero_title', array( 'default' => __( 'Jusur Kush', 'jusur-kush' ), 'sanitize_callback' => 'wp_kses_post' ) );
	$wp_customize->add_control( 'hero_title', array( 'label' => __( 'Hero Title', 'jusur-kush' ), 'section' => 'hero_section', 'type' => 'text' ) );
	
	$wp_customize->add_setting( 'hero_subtitle', array( 'default' => __( 'Bridging Sudanese startup businesses with customers. Discover authentic handmade goods, traditional crafts, and local products from across Sudan.', 'jusur-kush' ), 'sanitize_callback' => 'sanitize_textarea_field' ) );
	$wp_customize->add_control( 'hero_subtitle', array( 'label' => __( 'Hero Subtitle', 'jusur-kush' ), 'section' => 'hero_section', 'type' => 'textarea' ) );

	// Footer
	$wp_customize->add_section( 'footer_section', array( 'title' => __( 'Footer', 'jusur-kush' ), 'priority' => 120 ) );
	
	$wp_customize->add_setting( 'footer_copyright_text', array( 'default' => __( '© Jusur Kush. All rights reserved.', 'jusur-kush' ), 'sanitize_callback' => 'sanitize_text_field' ) );
	$wp_customize->add_control( 'footer_copyright_text', array( 'label' => __( 'Copyright Text', 'jusur-kush' ), 'section' => 'footer_section', 'type' => 'text' ) );
}
add_action( 'customize_register', 'jusur_kush_customize_register' );

/**
 * Output Customizer CSS to head.
 */
function jusur_kush_customizer_css() {
	$primary_color = get_theme_mod( 'primary_color', '#7C5C3A' );
	$secondary_color = get_theme_mod( 'secondary_color', '#A0744A' );
	echo "<style type='text/css'>:root { --brand-primary: " . esc_attr( $primary_color ) . "; --brand-secondary: " . esc_attr( $secondary_color ) . "; }</style>";
}
add_action( 'wp_head', 'jusur_kush_customizer_css' );
