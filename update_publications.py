import re
from scholarly import scholarly

def get_publications():
    print("Fetching publications from Google Scholar...")
    author = scholarly.search_author_id('DY-wDFkAAAAJ')
    scholarly.fill(author, sections=['publications'])

    publications = []

    # Let's get up to 15 recent publications
    for pub in author['publications'][:15]:
        scholarly.fill(pub)
        bib = pub['bib']

        # Determine if first author or co-author
        authors = bib.get('author', '')
        author_list = [a.strip() for a in authors.split(' and ')]

        is_first_author = False
        if len(author_list) > 0 and 'Mercado' in author_list[0]:
            is_first_author = True

        pub_type = 'first' if is_first_author else 'co'

        # Format the author string, bolding Luis
        formatted_authors = []
        for a in author_list:
            if 'Mercado' in a:
                if is_first_author:
                    formatted_authors.append(f'<span class="font-semibold text-slate-800 dark:text-slate-200">{a}</span>')
                else:
                    formatted_authors.append(f'<span class="font-medium text-slate-800 dark:text-slate-300">{a}</span>')
            else:
                formatted_authors.append(a)

        # Join with comma, and add 'et al.' if many
        if len(formatted_authors) > 3:
            authors_str = f"{formatted_authors[0]}, {formatted_authors[1]}, et al."
            # Make sure Luis is included if he's not in the first 2
            if not is_first_author and not ('Mercado' in formatted_authors[0] or 'Mercado' in formatted_authors[1]):
                for a in formatted_authors:
                    if 'Mercado' in a:
                        authors_str = f"{formatted_authors[0]}, {a}, et al."
                        break
        else:
            authors_str = ", ".join(formatted_authors)

        journal = bib.get('journal', bib.get('booktitle', bib.get('publisher', '')))
        year = bib.get('pub_year', '')
        volume = bib.get('volume', '')
        number = bib.get('number', '')
        pages = bib.get('pages', '')

        venue_str = journal
        if volume:
            venue_str += f", {volume}"
            if number:
                venue_str += f"({number})"
        if pages:
            venue_str += f", {pages}"
        if year:
            venue_str += f", {year}"

        title = bib.get('title', '')
        pub_url = pub.get('pub_url', '')

        border_class = 'border-primary' if is_first_author else 'border-slate-300 dark:border-slate-600'

        html = f"""
            <div class="pub-item {pub_type} p-6 bg-white dark:bg-darkCard rounded-lg shadow-sm border-l-4 {border_class} hover:shadow-md transition-shadow fade-in">
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">{title}</h3>
                <p class="text-slate-600 dark:text-slate-400 text-sm mb-2">{authors_str}</p>
                <p class="text-sm italic text-slate-500 dark:text-slate-500 mb-3">{venue_str}</p>
"""
        if pub_url:
            html += f"""                <a href="{pub_url}" target="_blank" class="inline-flex items-center text-sm text-primary hover:text-secondary hover:underline">
                    <i class="fas fa-external-link-alt mr-1 text-xs"></i> View Publication
                </a>
"""
        html += """            </div>"""

        publications.append({
            'year': int(year) if year else 0,
            'html': html
        })

    # Sort by year descending
    publications.sort(key=lambda x: x['year'], reverse=True)

    return "\n".join([p['html'] for p in publications])

def update_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    start_marker = '<div class="space-y-6" id="publications-list">'
    end_marker = '<!-- Experience -->'

    start_idx = content.find(start_marker)
    end_idx = content.find('</section>', start_idx) + len('</section>')

    if start_idx == -1 or end_idx == -1:
        print("Could not find the publications section in index.html")
        return

    # We only want to replace the inner content of publications-list
    list_end_idx = content.find('</section>', start_idx)
    list_end_idx = content.rfind('</div>', start_idx, list_end_idx) + len('</div>')

    pubs_html = get_publications()

    new_content = content[:start_idx + len(start_marker)] + "\n" + pubs_html + "\n        </div>\n    </section>\n" + content[end_idx:]

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)

    print("Successfully updated index.html with latest publications.")

if __name__ == "__main__":
    update_index_html()