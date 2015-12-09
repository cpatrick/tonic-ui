---
layout: default
---

<div class="home">

    <section class="intro">
        <div class="grid">
            <div class="unit whole center-on-mobiles">
                <p class="vision">{{ site.vision }}</p>
                <p class="description"> {{ site.description }}</p>
                <p class="details hide-on-mobiles"> {{ site.details }}</p>
            </div>
        </div>
    </section>
    <section class="feature">
        <div class='grid'>
            <div class='unit one-third'>
                <h2>React</h2>
                <p>
                    A large amount of Widgets rely on the React library
                    which allow them to be fast and well tested.
                </p>
            </div>
            <div class='unit one-third'>
                <h2>Components</h2>
                <p>
                    Tonic Widgets won't kill your application size if you are
                    only using 1 or 2 of its widgets.
                </p>
            </div>
            <div class="unit one-third">
                <h2>NPM + Webpack</h2>
                <p>
                    Use the library as a NPM dependency and just require the
                    piece you need. Then Webpack could do the bundling for you.
                </p>
            </div>
        </div>
    </section>
   <div class="grid">
        <div class="unit whole">

        <h2>Getting Started</h2>
        <p>{{ site.project }} can be retrieved using npm within your web project.</p>

        <h2>npm</h2>

{% highlight bash %}
$ npm install {{ site.project }} --save
{% endhighlight %}

        <h2>Quick-start</h2>
        For the impatient, here's how to get boilerplate {{ site.project }} up and running.

{% highlight bash %}
$ git clone git@github.com:{{site.repository}}.git
$ cd {{site.project}}
$ npm install
$ npm run www:http
# => Now browse to http://localhost:3000
{% endhighlight %}

        <h2>Documentation</h2>
        <p>See the <a href="{{ site.baseurl }}">documentation</a> for a getting started guide, advanced documentation,
        and API descriptions.</p>

        <h2>Licensing</h2>
        <p>{{ site.title }} is licensed under {{ site.license }}
        <a href="https://github.com/{{ site.repository }}/blob/master/LICENSE">License</a>.</p>

        <h2>Getting Involved</h2>
        <p>Fork the {{ site.project }} repository and do great things. At <a href="{{ site.companyURL }}">
        {{ site.company }}</a>, we want to make {{ site.project }} useful to as many people as possible.

        </div>
    </div>
</div>

