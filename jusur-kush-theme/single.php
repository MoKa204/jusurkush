<?php
/**
 * The template for displaying all single posts
 *
 * @package Jusur Kush
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header();
?>

<div class="page-container container">
	<div class="page-content" style="max-width: 800px; margin: 0 auto;">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<header class="entry-header" style="text-align: center; margin-bottom: 40px;">
					<?php the_title( '<h1 class="entry-title page-title">', '</h1>' ); ?>
					<div class="entry-meta" style="color: #6B7280; font-size: 0.9rem;">
						<?php
						echo esc_html( get_the_date() ) . ' | ' . esc_html( get_the_author() );
						?>
					</div>
				</header>

				<?php if ( has_post_thumbnail() ) : ?>
					<div class="post-thumbnail" style="margin-bottom: 40px;">
						<?php the_post_thumbnail( 'full', array( 'style' => 'border-radius: 16px; width: 100%; height: auto;' ) ); ?>
					</div>
				<?php endif; ?>

				<div class="entry-content">
					<?php
					the_content();
					
					wp_link_pages( array(
						'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'jusur-kush' ),
						'after'  => '</div>',
					) );
					?>
				</div>
			</article>
			
			<div class="post-navigation" style="display: flex; justify-content: space-between; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border);">
				<?php
				previous_post_link( '%link', '← %title' );
				next_post_link( '%link', '%title →' );
				?>
			</div>

			<?php
			if ( comments_open() || get_comments_number() ) :
				comments_template();
			endif;

		endwhile; // End of the loop.
		?>
	</div>
</div>

<?php
get_footer();
