<?php
/**
 * The main template file
 *
 * @package Jusur Kush
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

get_header();
?>

<div class="page-container container">
	<?php if ( is_home() && ! is_front_page() ) : ?>
		<header><h1 class="page-title"><?php single_post_title(); ?></h1></header>
	<?php endif; ?>
	
	<div class="page-content">
		<?php if ( have_posts() ) : ?>
			<?php while ( have_posts() ) : the_post(); ?>
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
			<?php endwhile; ?>
			<?php the_posts_navigation(); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'jusur-kush' ); ?></p>
		<?php endif; ?>
	</div>
</div>

<?php
get_footer();
