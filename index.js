System.register(["./application.js"], function (_export, _context) {
  "use strict";

  var Application, canvas, $p, bcr, application;
  
  // 修改这个函数，添加基础路径处理
  function topLevelImport(url) {
    // 处理 GitHub Pages 路径
    let actualUrl = url;
    
    // 如果是相对路径的模块，确保路径正确
    if (!url.startsWith('http') && !url.startsWith('//')) {
      // 检测是否在 GitHub Pages
      if (window.location.hostname.includes('github.io')) {
        // 获取基础路径
        const pathSegments = window.location.pathname.split('/').filter(s => s);
        let basePath = './';
        
        if (pathSegments.length >= 2) {
          // 格式：用户名/仓库名
          basePath = '/' + pathSegments[0] + '/' + pathSegments[1] + '/';
        }
        
        // 对于 cc 模块，需要正确路径
        if (url === 'cc') {
          actualUrl = basePath + 'src/chunks/cc.js';
        } else if (url === './application.js') {
          actualUrl = basePath + 'application.js';
        } else {
          actualUrl = basePath + url;
        }
        
        console.log('Loading module:', url, '->', actualUrl);
      }
    }
    
    return System["import"](actualUrl);
  }

  return {
    setters: [function (_applicationJs) {
      Application = _applicationJs.Application;
    }],
    execute: function () {
      canvas = document.getElementById('GameCanvas');
      $p = canvas.parentElement;
      bcr = $p.getBoundingClientRect();
      canvas.width = bcr.width;
      canvas.height = bcr.height;
      application = new Application();
      
      // 这里会调用 topLevelImport('cc')
      topLevelImport('cc').then(function (engine) {
        return application.init(engine);
      }).then(function () {
        return application.start();
      })["catch"](function (err) {
        console.error(err);
      });
    }
  };
});
