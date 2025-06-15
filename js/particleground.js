/**
 * Particleground
 * @author Jonathan Nicol - @mrjnicol
 * @version 1.1.0
 * @description Creates a canvas based particle system background
 */
;(function(window, document) {
  'use strict';
  var pluginName = 'particleground';

  // http://youmightnotneedjquery.com/#deep_extend
  function extend(out) {
    out = out || {};
    for (var i = 1; i < arguments.length; i++) {
      var obj = arguments[i];
      if (!obj) continue;
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object')
            extend(out[key], obj[key]);
          else
            out[key] = obj[key];
        }
      }
    }
    return out;
  }

  var $ = window.jQuery;

  function Plugin(element, options) {
    var canvasSupport = !!document.createElement('canvas').getContext;
    var canvas;
    var ctx;
    var particles = [];
    var raf;
    var mouseX = 0;
    var mouseY = 0;
    var winW;
    var winH;
    var desktop = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i);
    var orientationSupport = !!window.DeviceOrientationEvent;
    var tiltX = 0;
    var pointerX;
    var pointerY;
    var tiltY = 0;
    var paused = false;

    options = extend({}, window[pluginName].defaults, options);

    /**
     * Init
     */
    function init() {
      if (!canvasSupport) { return; }

      //Create canvas
      canvas = document.createElement('canvas');
      canvas.className = 'pg-canvas';
      canvas.style.display = 'block';
      element.insertBefore(canvas, element.firstChild);
      ctx = canvas.getContext('2d');
      styleCanvas();

      //Resize canvas
      window.addEventListener('resize', function() {
        resizeHandler();
      }, false);

      //Particle motion
      for (var i = 0; i < options.maxParticles; i++) {
        particles.push(new Particle());
      }

      //Interaction
      if (desktop) {
        window.addEventListener('mousemove', function(e) {
          mouseX = e.pageX;
          mouseY = e.pageY;
        }, false);

        if (orientationSupport) {
          window.addEventListener('deviceorientation', function(e) {
            tiltX = Math.min(Math.max(-e.beta, -30), 30);
            tiltY = Math.min(Math.max(-e.gamma, -30), 30);
          }, false);
        }

        element.addEventListener('mouseenter', function() {
          paused = false;
        }, false);

        element.addEventListener('mouseleave', function() {
          paused = true;
        }, false);
      }

      //Start animation
      raf = window.requestAnimationFrame(draw);
    }

    /**
     * Style the canvas
     */
    function styleCanvas() {
      canvas.width = element.offsetWidth;
      canvas.height = element.offsetHeight;
      ctx.fillStyle = options.dotColor;
      ctx.strokeStyle = options.lineColor;
      ctx.lineWidth = options.lineWidth;
    }

    /**
     * Draw particles
     */
    function draw() {
      if (!canvasSupport || paused) return;

      winW = window.innerWidth;
      winH = window.innerHeight;

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update particle positions and draw
      for (var i = 0; i < particles.length; i++) {
        particles[i].updatePosition();
        particles[i].draw();
      }

      // Draw lines between particles
      if (options.density > 0) {
        for (var i = 0; i < particles.length; i++) {
          for (var j = i + 1; j < particles.length; j++) {
            var p1 = particles[i];
            var p2 = particles[j];
            var dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
            if (dist < options.density) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
      raf = window.requestAnimationFrame(draw);
    }

    /**
     * Particle
     */
    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() * (options.speed * 2)) - options.speed;
      this.vy = (Math.random() * (options.speed * 2)) - options.speed;
      this.radius = options.particleRadius;

      this.updatePosition = function() {
        // Follow mouse/device orientation
        if (desktop) {
          var targetX = mouseX - element.offsetLeft;
          var targetY = mouseY - element.offsetTop;
          if (orientationSupport) {
            pointerX = (tiltY / 30) * winW * 0.5;
            pointerY = (tiltX / 30) * winH * 0.5;
            targetX += pointerX;
            targetY += pointerY;
          }
          this.vx += (targetX - this.x) * options.parallaxMultiplier;
          this.vy += (targetY - this.y) * options.parallaxMultiplier;
        }

        // Keep particles within bounds
        if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
          this.vx = -this.vx;
        }
        if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
          this.vy = -this.vy;
        }

        this.x += this.vx;
        this.y += this.vy;
      };

      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.closePath();
      };
    }

    /**
     * Resize handler
     */
    function resizeHandler() {
      styleCanvas();
    }

    init();
  }

  window[pluginName] = Plugin;
  window[pluginName].defaults = {
    minSpeedX: 0.1,
    maxSpeedX: 0.7,
    minSpeedY: 0.1,
    maxSpeedY: 0.7,
    directionX: 'center', // 'center', 'left' or 'right'. 'center' = dots bounce off edges
    directionY: 'center', // 'center', 'up' or 'down'. 'center' = dots bounce off edges
    density: 10000, // How many particles will be interconnected when density is greater than 0
    dotColor: 'rgba(0,255,255,0.5)',
    lineColor: 'rgba(0,255,255,0.1)',
    particleRadius: 2, // Dot size
    lineWidth: 0.5,
    curvedLines: false,
    proximity: 100, // How close two dots need to be to interact
    parallax: true,
    parallaxMultiplier: 0.005, // Adjusts the speed of parallax effect
    maxParticles: 150, // Maximum number of particles
    speed: 0.3 // General speed of particles
  };

  // Lightweight plugin wrapper, preventing multiple instantiations
  if ($) {
    $.fn[pluginName] = function(options) {
      return this.each(function() {
        if (!$.data(this, 'plugin_' + pluginName)) {
          $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
        }
      });
    };
  }

})(window, document);
