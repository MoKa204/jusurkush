<?php
/**
 * The template for displaying archive pages
 *
 * @package Jusur Kush
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header();
?>

<div class="page-container container">
	<?php if ( have_posts() ) : ?>
		<header class="page-header" style="margin-bottom: 40px; text-align: center;">
			<?php
			the_archive_title( '<h1 class="page-title">', '</h1>' );
			the_archive_description( '<div class="archive-description" style="color: #6B7280; font-size: 1.1rem; max-width: 600px; margin: 10px auto;">', '</div>' );
			?>
		</header>

		<div class="page-content" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 30px;">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article id="post-<?php the_ID(); ?>" <?php post_class( 'product-card' ); ?> style="display: flex; flex-direction: column;">
					<a href="<?php echo esc_url( get_permalink() ); ?>" style="flex: 1; display: flex; flex-direction: column;">
						<?php if ( has_post_thumbnail() ) : ?>
							<div class="product-img-wrap" style="height: 200px;">
								<?php the_post_thumbnail( 'medium' ); ?>
							</div>
						<?php endif; ?>
						<div class="product-info" style="flex: 1; display: flex; flex-direction: column;">
							<div class="product-name" style="font-size: 1.1rem; margin-bottom: 8px;">
								<?php the_title(); ?>
							</div>
							<div class="product-seller" style="margin-bottom: 12px; flex: 1;">
								<?php echo wp_trim_words( get_the_excerpt(), 15, '...' ); ?>
							</div>
							<div class="product-footer" style="margin-top: auto; color: var(--brand-secondary); font-weight: 700;">
								<?php echo esc_html( get_the_date() ); ?>
							</div>
						</div>
					</a>
				</article>
				<?php
			endwhile;
			?>
		</div>

		<div style="margin-top: 40px;">
			<?php the_posts_navigation(); ?>
		</div>

	<?php else : ?>
		<div class="page-content">
			<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'jusur-kush' ); ?></p>
		</div>
	<?php endif; ?>
</div>

<?php
get_footer();
