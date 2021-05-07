---
layout: post
author: Koen
category: Programmeren
tags: Programmeren Jekyll
title: "Jekyll snippet collection"
---
This post is a collection of code snippets I've sourced from around the internet and flavoured to my liking or to make them work. It currently includes the following: a tagcloud, tagpages, reading time, related posts and a simple archive. None of these require any plugins and all of them work on Github Pages. Post will be updated as I find and implement new features. 
<!--more-->


{:toc}
- Hi 

## Tagcloud
Generates a tagcloud like this one on my <a href="/archief/">archive page</a>. Of course, you still need to add tags to the frontmatter of every post. 

<ol>
<li>Create <code>collecttags.html</code>, paste the following code into it, and add it to your <code>_includes</code> folder (it collects tags)</li>


{% highlight liquid %}
{% raw %}
    {% assign rawtags = "" %}
    {% for post in site.posts %}
    {% assign ttags = post.tags | join:'|' | append:'|' %}
    {% assign rawtags = rawtags | append:ttags %}
    {% endfor %}
    {% assign rawtags = rawtags | split:'|' | sort %}

    {% assign site.tags = "" %}
    {% for tag in rawtags %}
    {% if tag != "" %}
        {% if tags == "" %}
        {% assign tags = tag | split:'|' %}
        {% endif %}
        {% unless tags contains tag %}
        {% assign tags = tags | join:'|' | append:'|' | append:tag | split:'|' %}
        {% endunless %}
    {% endif %}
    {% endfor %}
{% endraw %}
{% endhighlight %}

<li>Include it by adding this to your head:</li>

{% highlight liquid %}
{% raw %}
    {% if site.tags != "" %}
    {% include collecttags.html %}
    {% endif %}
{% endraw %}
{% endhighlight %}

<li>Create <code>tagcloud.html</code>, paste the following code into it and add it to your <code>_includes</code> folder.</li>

{% highlight liquid %}
{% raw %}
    {% capture temptags %}
      {% for tag in site.tags %}
        {{ tag[1].size | plus: 1000 }}#{{ tag[0] }}#{{ tag[1].size }}
      {% endfor %}
    {% endcapture %}
    {% assign sortedtemptags = temptags | split:' ' | sort | reverse %}
    {% for temptag in sortedtemptags %}
      {% assign tagitems = temptag | split: '#' %}
      {% capture tagname %}{{ tagitems[1] }}{% endcapture %}
        <a href="/Onderwerpen/{{ tagname }}">{{ tagname | downcase }}</a>
        {% if forloop.last %}{% else %},{% endif %}&nbsp;
    {% endfor %}
{% endraw %}
{% endhighlight %}

<li>Include <code>tagcloud.html</code> wherever you want your tagcloud to be.</li>

{% highlight liquid %}
{% raw %}
    {% include tagcloud.html %}
{% endraw %}
{% endhighlight %}

</ol>

## Tagpages

For a tagcloud to be useful, you want those links to lead somewhere: tagpages. Check out this <a href="/onderwerpen/technologie/">tagpage</a>. <b>Note:</b> this method requires you to create a manual Markdown file for each tag. 

<ol>
<li>Create <code>tagpage.html</code>, paste the following code into it and add it to your <code>_layouts</code> folder.</li>


{% highlight liquid %}
{% raw %}
    ---
    layout: default
    ---

    <h1>All posts about {{ page.title | downcase}}</h1>
    <ul>
    {% for post in site.tags[page.tag] %}
    <li>{{ post.date | date: "%d-%m-%Y" }} | 
        <a href="{{ post.url }}">{{ post.title }}</a><br>
    </li>
    {% endfor %}
    </ul>
{% endraw %}
{% endhighlight %}

<li>Create a new folder called <code>tags</code> (without the underscore!) at the root of your directory.</li>

<li>To this folder, add a separate Markdown file for each of your tags. For example: <code>technology.md.</code></li>

<li>To each of these newly made Markdown files, add the following code (replace "technology" with your tags).</li>

{% highlight liquid %}
{% raw %}
---
layout: tagpage
title: "Technology"
tag: Technology
---
{% endraw %}
{% endhighlight %}
</ol>

## Reading time
Captures the number of words in your posts, divides it by an average number of words read per minute, and prints it in a nicely formatted way.

<ol>
<li>Create <code>reading_time.html</code>, paste the following code into it and add it to your <code>_includes</code> folder.</li>

{% highlight liquid %}
{% raw %}
{% if page.url == "/" %}
    {% capture words %}
    {{ post.content | number_of_words | minus: 360}}
    {% endcapture %}
{% else %}
    {% capture words %}
    {{ page.content | number_of_words | minus: 360}}
    {% endcapture %}
{% endif %}

{% if words contains '-' %}
1 minute
{% else %}
{{ words | plus: 360 | divided_by: 180 | append: ' minutes' }}
{% endif %} reading time
{% endraw %}
{% endhighlight %}

<li>Include <code>reading-time.html</code> wherever you want!</li>
</ol>

## Related posts

Creates an unordered list of related posts based on a specified amount of common tags. You can customize the maximum amount of related post you want to see by changing <code>maxRelated</code>, and the minimum amount of common tags by changing <code>minCommonTags</code>.

<ol>
<li>Create <code>related_posts.html</code>, paste the following code into it and add it to your <code>_includes</code> folder.</li>

{% highlight liquid %}
{% raw %}
{% assign maxRelated = 4 %}
    {% assign minCommonTags =  1 %}
    {% assign maxRelatedCounter = 0 %}
    
      {% for post in site.posts %}
    
        {% assign sameTagCount = 0 %}
        {% assign commonTags = '' %}
    
        {% for tag in post.tags %}
          {% if post.url != page.url %}
            {% if page.tags contains tag %}
              {% assign sameTagCount = sameTagCount | plus: 1 %}
              {% capture tagmarkup %} <span class="label label-default">{{ tag }}</span> {% endcapture %}
              {% assign commonTags = commonTags | append: tagmarkup %}
            {% endif %}
          {% endif %}
        {% endfor %}
    
        {% if sameTagCount >= minCommonTags %}
          <ul>
            <li><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></li>

          {% assign maxRelatedCounter = maxRelatedCounter | plus: 1 %}
          {% if maxRelatedCounter >= maxRelated %}
            {% break %}
          {% endif %}
        {% endif %}
          </ul>
      {% endfor %}
{% endraw %}
{% endhighlight %}

<li>Include <code>related_posts.html</code> to <code>post.html</code> in <code>_layouts</code>, or anywhere else you want to see this snippet in action.</li>
</ol>

## Archive

Simply iterate over all of your posts like so:

{% highlight liquid %}
{% raw %}
        <ul>    
            {% for post in site.posts %}
            <li>{{ post.date | date: "%d-%m-%Y" }} | <a href="{{ post.url }}">{{ post.title }}</a><br>
            </li>
            {% endfor %}
        </ul>
{% endraw %}
{% endhighlight %}
