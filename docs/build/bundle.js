
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }
    class HtmlTag {
        constructor(html, anchor = null) {
            this.e = element('div');
            this.a = anchor;
            this.u(html);
        }
        m(target, anchor = null) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(target, this.n[i], anchor);
            }
            this.t = target;
        }
        u(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        p(html) {
            this.d();
            this.u(html);
            this.m(this.t, this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    const seen_callbacks = new Set();
    function flush() {
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const prop_values = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, prop_values, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if ($$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set() {
            // overridden by instance, if it has props
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.18.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev("SvelteDOMInsert", { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev("SvelteDOMInsert", { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev("SvelteDOMRemove", { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ["capture"] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev("SvelteDOMAddEventListener", { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev("SvelteDOMRemoveEventListener", { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev("SvelteDOMRemoveAttribute", { node, attribute });
        else
            dispatch_dev("SvelteDOMSetAttribute", { node, attribute, value });
    }
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error(`'target' is a required option`);
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn(`Component was already destroyed`); // eslint-disable-line no-console
            };
        }
    }

    /* src/App.svelte generated by Svelte v3.18.1 */

    const file = "src/App.svelte";

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[6] = list[i];
    	return child_ctx;
    }

    // (84:0) {:else}
    function create_else_block(ctx) {
    	let div4;
    	let div3;
    	let div2;
    	let h1;
    	let t1;
    	let div0;
    	let t3;
    	let div1;
    	let a0;
    	let t5;
    	let a1;
    	let t7;
    	let t8;
    	let section;
    	let div7;
    	let h2;
    	let t10;
    	let div5;
    	let h3;
    	let p;
    	let t12;
    	let br0;
    	let t13;
    	let br1;
    	let t14;
    	let t15;
    	let div6;
    	let t16;
    	let div8;
    	let picture;
    	let source0;
    	let t17;
    	let source1;
    	let t18;
    	let img;
    	let img_src_value;
    	let each_value_2 = /*sections*/ ctx[1];
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_1[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	let each_value_1 = /*contact*/ ctx[2];
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div2 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Entistä parempi verkkokauppa";
    			t1 = space();
    			div0 = element("div");
    			div0.textContent = "Tarjoamme juuri sinulle parhaat verkkokaupparatkaisut kotimaiseen ja kansainväliseen kaupankäyntiin erittäin kilpailukykyisellä hinnalla ja monen vuoden osaamisella.";
    			t3 = space();
    			div1 = element("div");
    			a0 = element("a");
    			a0.textContent = "Soita meille";
    			t5 = space();
    			a1 = element("a");
    			a1.textContent = "Lähetä viesti";
    			t7 = space();

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t8 = space();
    			section = element("section");
    			div7 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Yhteystiedot";
    			t10 = space();
    			div5 = element("div");
    			h3 = element("h3");
    			h3.textContent = "Dataline Group Oy";
    			p = element("p");
    			t12 = text("Lehtikuusentie 5,");
    			br0 = element("br");
    			t13 = text("26100 Rauma");
    			br1 = element("br");
    			t14 = text("2354053-6");
    			t15 = space();
    			div6 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t16 = space();
    			div8 = element("div");
    			picture = element("picture");
    			source0 = element("source");
    			t17 = space();
    			source1 = element("source");
    			t18 = space();
    			img = element("img");
    			add_location(h1, file, 88, 3, 3209);
    			attr_dev(div0, "id", "sum");
    			attr_dev(div0, "class", "mb-4");
    			add_location(div0, file, 89, 3, 3250);
    			attr_dev(a0, "class", "btn");
    			attr_dev(a0, "href", "tel:+358407746121");
    			attr_dev(a0, "title", "Keskutellaan miten voimme parantaa teidän verkkosivustoa");
    			attr_dev(a0, "rel", "nofollow noopener");
    			add_location(a0, file, 91, 4, 3475);
    			attr_dev(a1, "class", "btn");
    			attr_dev(a1, "href", "mailto:myynti@dataline.fi");
    			attr_dev(a1, "title", "Lähetä rohkeasti sähköpostia ja sovitaan tapaaminen");
    			attr_dev(a1, "rel", "nofollow noopener");
    			add_location(a1, file, 92, 4, 3625);
    			attr_dev(div1, "id", "buttons");
    			add_location(div1, file, 90, 3, 3452);
    			attr_dev(div2, "id", "caption_inner");
    			add_location(div2, file, 87, 2, 3181);
    			attr_dev(div3, "id", "caption");
    			attr_dev(div3, "class", "cell");
    			add_location(div3, file, 86, 1, 3147);
    			attr_dev(div4, "id", "hero");
    			add_location(div4, file, 85, 0, 3130);
    			add_location(h2, file, 123, 2, 4620);
    			add_location(h3, file, 125, 3, 4677);
    			add_location(br0, file, 125, 49, 4723);
    			add_location(br1, file, 125, 64, 4738);
    			add_location(p, file, 125, 29, 4703);
    			attr_dev(div5, "id", "yritys");
    			attr_dev(div5, "class", "rmb");
    			add_location(div5, file, 124, 2, 4644);
    			attr_dev(div6, "class", "row");
    			add_location(div6, file, 127, 2, 4767);
    			attr_dev(div7, "class", "container");
    			add_location(div7, file, 122, 1, 4594);
    			attr_dev(section, "id", "yhteystiedot");
    			attr_dev(section, "class", "big");
    			add_location(section, file, 121, 0, 4553);
    			attr_dev(source0, "srcset", "/images/dataline-667.webp 667w,/images/dataline-768.webp 768w,/images/dataline-1080.webp 1080w");
    			attr_dev(source0, "type", "image/webp");
    			add_location(source0, file, 140, 2, 5209);
    			attr_dev(source1, "srcset", "/images/dataline-667.jpg 667w,/images/dataline-768.jpg 768w,/images/dataline-1080.jpg 1080w");
    			attr_dev(source1, "type", "image/jpg");
    			add_location(source1, file, 141, 2, 5342);
    			if (img.src !== (img_src_value = "/images/dataline-1080.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Verkkosivut yritykselle nopeasti ja ammattitaidolla");
    			add_location(img, file, 142, 2, 5471);
    			add_location(picture, file, 139, 1, 5197);
    			attr_dev(div8, "id", "bg");
    			add_location(div8, file, 138, 0, 5182);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div2);
    			append_dev(div2, h1);
    			append_dev(div2, t1);
    			append_dev(div2, div0);
    			append_dev(div2, t3);
    			append_dev(div2, div1);
    			append_dev(div1, a0);
    			append_dev(div1, t5);
    			append_dev(div1, a1);
    			insert_dev(target, t7, anchor);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(target, anchor);
    			}

    			insert_dev(target, t8, anchor);
    			insert_dev(target, section, anchor);
    			append_dev(section, div7);
    			append_dev(div7, h2);
    			append_dev(div7, t10);
    			append_dev(div7, div5);
    			append_dev(div5, h3);
    			append_dev(div5, p);
    			append_dev(p, t12);
    			append_dev(p, br0);
    			append_dev(p, t13);
    			append_dev(p, br1);
    			append_dev(p, t14);
    			append_dev(div7, t15);
    			append_dev(div7, div6);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div6, null);
    			}

    			insert_dev(target, t16, anchor);
    			insert_dev(target, div8, anchor);
    			append_dev(div8, picture);
    			append_dev(picture, source0);
    			append_dev(picture, t17);
    			append_dev(picture, source1);
    			append_dev(picture, t18);
    			append_dev(picture, img);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*sections, references*/ 3) {
    				each_value_2 = /*sections*/ ctx[1];
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    					} else {
    						each_blocks_1[i] = create_each_block_2(child_ctx);
    						each_blocks_1[i].c();
    						each_blocks_1[i].m(t8.parentNode, t8);
    					}
    				}

    				for (; i < each_blocks_1.length; i += 1) {
    					each_blocks_1[i].d(1);
    				}

    				each_blocks_1.length = each_value_2.length;
    			}

    			if (dirty & /*contact*/ 4) {
    				each_value_1 = /*contact*/ ctx[2];
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div6, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (detaching) detach_dev(t7);
    			destroy_each(each_blocks_1, detaching);
    			if (detaching) detach_dev(t8);
    			if (detaching) detach_dev(section);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t16);
    			if (detaching) detach_dev(div8);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(84:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (64:0) {#if references}
    function create_if_block(ctx) {
    	let div3;
    	let div1;
    	let div0;
    	let t0;
    	let button;
    	let div2;
    	let dispose;
    	let if_block = /*references*/ ctx[0] == "verkkokaupat" && create_if_block_1(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			if (if_block) if_block.c();
    			t0 = space();
    			button = element("button");
    			div2 = element("div");
    			div2.textContent = "X";
    			attr_dev(div0, "class", "row");
    			add_location(div0, file, 65, 44, 2581);
    			attr_dev(div1, "class", "container");
    			add_location(div1, file, 65, 21, 2558);
    			attr_dev(div2, "class", "cell");
    			add_location(div2, file, 81, 64, 3079);
    			attr_dev(button, "id", "close");
    			add_location(button, file, 81, 12, 3027);
    			attr_dev(div3, "id", "references");
    			add_location(div3, file, 65, 0, 2537);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			if (if_block) if_block.m(div0, null);
    			append_dev(div0, t0);
    			append_dev(div3, button);
    			append_dev(button, div2);
    			dispose = listen_dev(button, "click", /*click_handler*/ ctx[4], false, false, false);
    		},
    		p: function update(ctx, dirty) {
    			if (/*references*/ ctx[0] == "verkkokaupat") {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(div0, t0);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (if_block) if_block.d();
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(64:0) {#if references}",
    		ctx
    	});

    	return block;
    }

    // (114:5) {#if item.button == 1}
    function create_if_block_2(ctx) {
    	let div;
    	let button;
    	let dispose;

    	function click_handler_1(...args) {
    		return /*click_handler_1*/ ctx[5](/*item*/ ctx[6], ...args);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			button = element("button");
    			button.textContent = "Referenssit";
    			attr_dev(button, "class", "btn");
    			add_location(button, file, 113, 51, 4405);
    			attr_dev(div, "class", "references");
    			add_location(div, file, 113, 27, 4381);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, button);
    			dispose = listen_dev(button, "click", click_handler_1, false, false, false);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(114:5) {#if item.button == 1}",
    		ctx
    	});

    	return block;
    }

    // (99:0) {#each sections as item}
    function create_each_block_2(ctx) {
    	let section;
    	let div4;
    	let div3;
    	let div0;
    	let picture;
    	let source0;
    	let source0_srcset_value;
    	let t0;
    	let source1;
    	let source1_srcset_value;
    	let t1;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t2;
    	let div2;
    	let div1;
    	let h2;
    	let t3_value = /*item*/ ctx[6].title + "";
    	let t3;
    	let t4;
    	let html_tag;
    	let raw_value = /*item*/ ctx[6].desc + "";
    	let t5;
    	let section_id_value;
    	let section_class_value;
    	let if_block = /*item*/ ctx[6].button == 1 && create_if_block_2(ctx);

    	const block = {
    		c: function create() {
    			section = element("section");
    			div4 = element("div");
    			div3 = element("div");
    			div0 = element("div");
    			picture = element("picture");
    			source0 = element("source");
    			t0 = space();
    			source1 = element("source");
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			div2 = element("div");
    			div1 = element("div");
    			h2 = element("h2");
    			t3 = text(t3_value);
    			t4 = space();
    			t5 = space();
    			if (if_block) if_block.c();
    			attr_dev(source0, "srcset", source0_srcset_value = "/images/palvelumme-" + /*item*/ ctx[6].id + "-320.webp");
    			attr_dev(source0, "type", "image/webp");
    			add_location(source0, file, 104, 5, 3974);
    			attr_dev(source1, "srcset", source1_srcset_value = "/images/palvelumme-" + /*item*/ ctx[6].id + "-320.jpg");
    			attr_dev(source1, "type", "image/jpeg");
    			add_location(source1, file, 105, 5, 4059);
    			attr_dev(img, "class", "img");
    			if (img.src !== (img_src_value = "/images/palvelumme-" + /*item*/ ctx[6].id + "-320.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*item*/ ctx[6].img_desc);
    			add_location(img, file, 106, 5, 4143);
    			add_location(picture, file, 103, 4, 3959);
    			attr_dev(div0, "class", "col-4 r1");
    			add_location(div0, file, 102, 3, 3932);
    			add_location(h2, file, 111, 5, 4309);
    			html_tag = new HtmlTag(raw_value, t5);
    			attr_dev(div1, "class", "cell");
    			add_location(div1, file, 110, 4, 4285);
    			attr_dev(div2, "class", "col-8 r1");
    			add_location(div2, file, 109, 3, 4258);
    			attr_dev(div3, "class", "row");
    			add_location(div3, file, 101, 2, 3911);
    			attr_dev(div4, "class", "container");
    			add_location(div4, file, 100, 1, 3885);
    			attr_dev(section, "id", section_id_value = /*item*/ ctx[6].id);
    			attr_dev(section, "class", section_class_value = "big bg" + /*item*/ ctx[6].bg);
    			add_location(section, file, 99, 0, 3835);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div4);
    			append_dev(div4, div3);
    			append_dev(div3, div0);
    			append_dev(div0, picture);
    			append_dev(picture, source0);
    			append_dev(picture, t0);
    			append_dev(picture, source1);
    			append_dev(picture, t1);
    			append_dev(picture, img);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h2);
    			append_dev(h2, t3);
    			append_dev(div1, t4);
    			html_tag.m(div1);
    			append_dev(div1, t5);
    			if (if_block) if_block.m(div1, null);
    		},
    		p: function update(ctx, dirty) {
    			if (/*item*/ ctx[6].button == 1) if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    			if (if_block) if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(99:0) {#each sections as item}",
    		ctx
    	});

    	return block;
    }

    // (129:3) {#each contact as item}
    function create_each_block_1(ctx) {
    	let div;
    	let h3;
    	let a0;
    	let t0_value = /*item*/ ctx[6].name + "";
    	let t0;
    	let a0_href_value;
    	let a0_title_value;
    	let t1;
    	let p;
    	let t2_value = /*item*/ ctx[6].job + "";
    	let t2;
    	let br0;
    	let a1;
    	let t3_value = /*item*/ ctx[6].phone + "";
    	let t3;
    	let a1_href_value;
    	let br1;
    	let a2;
    	let t4_value = /*item*/ ctx[6].email + "";
    	let t4;
    	let a2_href_value;
    	let t5;
    	let div_id_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h3 = element("h3");
    			a0 = element("a");
    			t0 = text(t0_value);
    			t1 = space();
    			p = element("p");
    			t2 = text(t2_value);
    			br0 = element("br");
    			a1 = element("a");
    			t3 = text(t3_value);
    			br1 = element("br");
    			a2 = element("a");
    			t4 = text(t4_value);
    			t5 = space();
    			attr_dev(a0, "href", a0_href_value = /*item*/ ctx[6].link);
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "title", a0_title_value = /*item*/ ctx[6].link_title);
    			attr_dev(a0, "rel", "noopener");
    			add_location(a0, file, 130, 8, 4860);
    			add_location(h3, file, 130, 4, 4856);
    			add_location(br0, file, 131, 17, 4973);
    			attr_dev(a1, "href", a1_href_value = "tel:" + /*item*/ ctx[6].phone_link);
    			attr_dev(a1, "rel", "nofollow noopener");
    			add_location(a1, file, 131, 21, 4977);
    			add_location(br1, file, 131, 95, 5051);
    			attr_dev(a2, "href", a2_href_value = "mailto:" + /*item*/ ctx[6].mail);
    			attr_dev(a2, "rel", "nofollow noopener");
    			add_location(a2, file, 131, 99, 5055);
    			add_location(p, file, 131, 4, 4960);
    			attr_dev(div, "id", div_id_value = /*item*/ ctx[6].id);
    			attr_dev(div, "class", "col-6 rmb");
    			add_location(div, file, 129, 3, 4815);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h3);
    			append_dev(h3, a0);
    			append_dev(a0, t0);
    			append_dev(div, t1);
    			append_dev(div, p);
    			append_dev(p, t2);
    			append_dev(p, br0);
    			append_dev(p, a1);
    			append_dev(a1, t3);
    			append_dev(p, br1);
    			append_dev(p, a2);
    			append_dev(a2, t4);
    			append_dev(div, t5);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(129:3) {#each contact as item}",
    		ctx
    	});

    	return block;
    }

    // (68:1) {#if references == "verkkokaupat"}
    function create_if_block_1(ctx) {
    	let each_1_anchor;
    	let each_value = /*shop*/ ctx[3];
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*shop*/ 8) {
    				each_value = /*shop*/ ctx[3];
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(68:1) {#if references == \\\"verkkokaupat\\\"}",
    		ctx
    	});

    	return block;
    }

    // (70:2) {#each shop as item}
    function create_each_block(ctx) {
    	let a;
    	let picture;
    	let source0;
    	let source0_srcset_value;
    	let t0;
    	let source1;
    	let source1_srcset_value;
    	let t1;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t2;
    	let a_href_value;
    	let a_title_value;

    	const block = {
    		c: function create() {
    			a = element("a");
    			picture = element("picture");
    			source0 = element("source");
    			t0 = space();
    			source1 = element("source");
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			attr_dev(source0, "srcset", source0_srcset_value = "/images/ref-" + /*item*/ ctx[6].img + ".webp");
    			attr_dev(source0, "type", "image/webp");
    			add_location(source0, file, 72, 4, 2766);
    			attr_dev(source1, "srcset", source1_srcset_value = "/images/ref-" + /*item*/ ctx[6].img + ".jpg");
    			attr_dev(source1, "type", "image/jpeg");
    			add_location(source1, file, 73, 4, 2840);
    			if (img.src !== (img_src_value = "/images/ref-" + /*item*/ ctx[6].img + ".jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*item*/ ctx[6].title);
    			add_location(img, file, 74, 4, 2913);
    			add_location(picture, file, 71, 3, 2752);
    			attr_dev(a, "class", "col-4 mb");
    			attr_dev(a, "href", a_href_value = /*item*/ ctx[6].url);
    			attr_dev(a, "title", a_title_value = /*item*/ ctx[6].title);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "rel", "noopener");
    			add_location(a, file, 70, 2, 2662);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, picture);
    			append_dev(picture, source0);
    			append_dev(picture, t0);
    			append_dev(picture, source1);
    			append_dev(picture, t1);
    			append_dev(picture, img);
    			append_dev(a, t2);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(70:2) {#each shop as item}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let a;
    	let source0;
    	let t0;
    	let source1;
    	let t1;
    	let img;
    	let img_src_value;
    	let t2;
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*references*/ ctx[0]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			a = element("a");
    			source0 = element("source");
    			t0 = space();
    			source1 = element("source");
    			t1 = space();
    			img = element("img");
    			t2 = space();
    			if_block.c();
    			if_block_anchor = empty();
    			attr_dev(source0, "srcset", "/images/dataline-logo.webp");
    			attr_dev(source0, "type", "image/webp");
    			add_location(source0, file, 58, 1, 2301);
    			attr_dev(source1, "srcset", "/images/dataline-logo.png");
    			attr_dev(source1, "type", "image/png");
    			add_location(source1, file, 59, 1, 2365);
    			if (img.src !== (img_src_value = "/images/dataline-logo.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Dataline Group Oy");
    			attr_dev(img, "width", "135");
    			attr_dev(img, "height", "27");
    			add_location(img, file, 60, 1, 2427);
    			attr_dev(a, "id", "logo");
    			attr_dev(a, "href", "/");
    			attr_dev(a, "rel", "home");
    			add_location(a, file, 57, 0, 2266);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			append_dev(a, source0);
    			append_dev(a, t0);
    			append_dev(a, source1);
    			append_dev(a, t1);
    			append_dev(a, img);
    			insert_dev(target, t2, anchor);
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (detaching) detach_dev(t2);
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let sections = [
    		{
    			title: "Verkkokauppa yritykselle",
    			id: "verkkokaupat",
    			img_desc: "",
    			desc: "<p>Meille tärkeää on, että pääset nopeasti ja luotettavasti myymään tuotteitasi uudessa verkkokaupassa. Meiltä löytyy kaikki toiminnot, jotka tarvitset menestyvän verkkokaupan ylläpitämiseen ja kehitämme verkkokauppaa paremmaksi yhdessä asiakkaidemme kanssa. Verkkokauppaan on mahdollista myös integroida toiminnanohjausjärjestelmä, kuten esim. Lemonsoft.</p><p>Verkkokaupat teemme helppokäyttöisellä ja selkeällä ProcessWire-verkkokauppa-alustalla. Datalinen kotisivut ja verkkokauppa sopivat kaikille toimialoille ravintoloista vaatekauppoihin ja urheiluseuroista tukkukauppoihin.</p><p>Teemme verkkosivuja, joista olemme ylpeitä!</p>",
    			button: 1,
    			bg: 1
    		},
    		{
    			title: "Kotisivut urheiluseuralle",
    			id: "urheiluseurat",
    			img_desc: "",
    			desc: "<p>Dataline tarjoaa urheiluseuroille monimuotoisen ja helposti päivitettävän urheilualustan. Kattavat perusominaisuudet sisältävät uutiset, joukkuetiedot, videot, kausittaiset ottelut, seuran statiikat, verkkokaupan, aitiovaraukset ja paljon muuta hyödyllistä. Kehitämme sivustoja urheiluseurojen tarpeiden mukaan ja lisäämme vuosittain uusia ominaisuuksia.</p><p>Kaipaako verkkosivut uudistusta? Ota rohkeasti yhteyttä!</p>",
    			button: 0,
    			bg: 2
    		}
    	];

    	let contact = [
    		{
    			id: "tuspe",
    			link: "https://tuspe.com/",
    			link_title: "Tuspe Design - verkkosivut ja verkkokaupat yritykselle",
    			name: "Timo Anttila",
    			job: "Myynti ja toteutukset",
    			phone: "040 774 6121",
    			phone_link: "+358407746121",
    			email: "info@tuspe.com"
    		},
    		{
    			id: "molentum",
    			link: "https://molentum.fi/",
    			link_title: "Molentum Oy - paremman palvelun digitoimisto",
    			name: "Mika Lähteenmäki",
    			job: "Myynti ja asiakaspalvelu",
    			phone: "0400 273 150",
    			phone_link: "+358400273150",
    			email: "myynti@dataline.fi"
    		}
    	];

    	let shop = [
    		{
    			title: "NavyBlue Shop",
    			url: "https://navyblue.fi/",
    			img: "processwire-navyblue-2019"
    		},
    		{
    			title: "Lennol Oy",
    			url: "https://www.lennol.fi/",
    			img: "processwire-lennol-2019"
    		},
    		{
    			title: "Suomen Taksitarvike Oy",
    			url: "https://taksitarvike.fi/",
    			img: "processwire-taksitarvike-2020"
    		}
    	];

    	let references;
    	const click_handler = () => $$invalidate(0, references = "");
    	const click_handler_1 = item => $$invalidate(0, references = item.id);

    	$$self.$capture_state = () => {
    		return {};
    	};

    	$$self.$inject_state = $$props => {
    		if ("sections" in $$props) $$invalidate(1, sections = $$props.sections);
    		if ("contact" in $$props) $$invalidate(2, contact = $$props.contact);
    		if ("shop" in $$props) $$invalidate(3, shop = $$props.shop);
    		if ("references" in $$props) $$invalidate(0, references = $$props.references);
    	};

    	return [references, sections, contact, shop, click_handler, click_handler_1];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
