-- Repoint news covers and publication thumbnails to compressed copies served by the site.
-- Originals remain in Supabase storage untouched. Run once in the Supabase SQL editor.

update public.news_posts set cover_image_url = '/assets/news/ellembelle-energy-transition-committee-launch.webp' where slug = 'ellembelle-energy-transition-committee-launch';
update public.news_posts set cover_image_url = '/assets/news/women-in-leadership-ghana-extractive-sector.webp' where slug = 'women-in-leadership-ghana-extractive-sector';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/the-effects-of-covid-19-on-the-petroleum-and-mining-sectors-of-ghana.webp' where slug = 'the-effects-of-covid-19-on-the-petroleum-and-mining-sectors-of-ghana';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/comprehensive-review-and-gap-analysis-of-ghanas-transition-to-e2-3ws.webp' where slug = 'comprehensive-review-and-gap-analysis-of-ghanas-transition-to-e2-3ws';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/impact-assessment-of-abfa-utilization-by-development-authorities.webp' where slug = 'impact-assessment-of-abfa-utilization-by-development-authorities';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/implementation-of-beneficial-ownership-bo-disclosure.webp' where slug = 'implementation-of-beneficial-ownership-bo-disclosure';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/abfa-utilisation-in-bridging-inequality-gap-in-ghana-study.webp' where slug = 'abfa-utilisation-in-bridging-inequality-gap-in-ghana-study';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/energy-transition-cost-opportunities-and-policy-options-for-ghana.webp' where slug = 'energy-transition-cost-opportunities-and-policy-options-for-ghana';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/piac-communication-strategy.webp' where slug = 'piac-communication-strategy';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/exploring-the-transition-pathways-to-electric-2-3-wheelers-in-ghana-inception-report.webp' where slug = 'exploring-the-transition-pathways-to-electric-2-3-wheelers-in-ghana-inception-report';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/piac-public-perception.webp' where slug = 'piac-public-perception';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/enhancing-women-participation-in-extractive-sector-governance.webp' where slug = 'enhancing-women-participation-in-extractive-sector-governance';
update public.publications set thumbnail_url = '/assets/publication-thumbnails/asm-stakeholder-mapping-and-preparation-of-2020-ghana-eiti-technical-report-on-the-asm-sector.webp' where slug = 'asm-stakeholder-mapping-and-preparation-of-2020-ghana-eiti-technical-report-on-the-asm-sector';
