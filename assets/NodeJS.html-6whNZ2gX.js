import{_ as s,e as l,f as i,o as n}from"./app-48hTYp2a.js";const a={};function t(d,e){return n(),l("div",null,e[0]||(e[0]=[i(`<h2 id="nodejs事件循环" tabindex="-1"><a class="header-anchor" href="#nodejs事件循环"><span>NodeJS事件循环</span></a></h2><p>NodeJS的事件循环比起JS而言更加复杂，此事件循环中共有六个阶段：</p><ol><li>timers：执行setTimeout和setInterval<strong>到期</strong>的回调；</li><li>Pending I/O Callback 阶段：处理系统操作的回调（如tcp错误）；</li><li>idle/prepare 阶段：内部使用，开发者无需关注；</li><li>Poll阶段 <ul><li>等待新的I/O请求（如文件读取，网络请求响应）。</li><li>执行与I/O相关的回调（如fs.readFile的回调）。</li></ul></li><li>check阶段：执行setImmediate的回调。(若poll阶段处于空闲，且此阶段存在回调，则poll阶段不做等待，直接进入check阶段)；</li><li>close callback阶段：处理关闭事件的回调（如<code>socket.on(&#39;close&#39;, ...)</code>）；</li></ol><p>e.g</p><div class="language-JavaScript line-numbers-mode" data-highlighter="prismjs" data-ext="JavaScript" data-title="JavaScript"><pre><code><span class="line">const fs = require(&#39;node:fs&#39;);</span>
<span class="line"></span>
<span class="line">console.log(&#39;start&#39;);</span>
<span class="line"></span>
<span class="line">setTimeout(() =&gt; console.log(&#39;Timeout 1&#39;), 0);</span>
<span class="line"></span>
<span class="line">fs.readFile(&quot;./example.ts&quot;, () =&gt; {</span>
<span class="line">    console.log(&#39;File Readed&#39;);</span>
<span class="line">    setTimeout(() =&gt; console.log(&#39;Timeout 2&#39;), 0);</span>
<span class="line">    setImmediate(() =&gt; console.log(&#39;Immdeiate&#39;));</span>
<span class="line">})</span>
<span class="line"></span>
<span class="line">setImmediate(() =&gt; console.log(&#39;Immediate outer&#39;));</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段程序的输出是</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre><code><span class="line">start</span>
<span class="line">Timeout 1</span>
<span class="line">Immediate outer</span>
<span class="line">File Readed</span>
<span class="line">Immdeiate</span>
<span class="line">Timeout 2</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>分析：</p><p><strong>第一次循环</strong>：首先执行同步任务<code>start</code>,遇到<code>Timeout 1</code>，注册到timer阶段，遇到<code>readFile</code>，注册到Poll阶段，<code>Immediate outer</code>，注册到check阶段，注册完毕，事件循环开始；由于经过1ms,timer阶段还没结束，于是执行回调<code>Timeout 1</code>,timer队列空，进入poll阶段，此时文件没有读取完，poll空闲，而check阶段有任务，于是跳过poll进入check，执行<code>Immediate outer</code>后此次循环结束，进入第二次循环;</p><p><strong>第二次循环</strong>：直到poll都没任务，进入poll阶段先进行同步代码File readed，然后注册两个定时器，poll结束，到check，此时check有刚刚注册的Immediate，执行，进入第三次循环;</p><p><strong>第三次循环</strong>：timer执行上一次循环放进来的timeout2，任务全部执行完毕;</p><p>由于事件循环的机制，在主模块中immediate和timeout的执行顺序可能会取决于线程的性能（不到1ms就结束了timer阶段会导致immediate比timeout先运行，同理反之），但在I/O文件里的immediate一定先于timeout，这是因为immediate属于的check就在I/O属于的poll阶段后</p>`,12)]))}const c=s(a,[["render",t],["__file","NodeJS.html.vue"]]),r=JSON.parse('{"path":"/blogs/NodeJS/NodeNote/NodeJS.html","title":"NodeJS重点小记","lang":"zh-CN","frontmatter":{"title":"NodeJS重点小记","author":"shoushouwei","date":"2025-3-14","categories":["NodeJS/NodeNote"]},"headers":[{"level":2,"title":"NodeJS事件循环","slug":"nodejs事件循环","link":"#nodejs事件循环","children":[]}],"git":{},"filePathRelative":"blogs/NodeJS/NodeNote/NodeJS.md"}');export{c as comp,r as data};
