module.exports = function(grunt) {
  	//自定义变量
    var pkg = grunt.file.readJSON('package.json'),
        banner = '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      			'* by <%= pkg.author.name %> '+
      			'* time <%= grunt.template.today("yyyy") %> */';

  //自定义配置
  grunt.initConfig({
    	//清空build文件
	    clean: {
	      build:["./build"]
	    },
	    //进行less编译
	    less:{
	    	//开发模式
	    	development:{
	    		options:{
	    			//是否兼容到ie8
	    			isCompat:true,
	    			//是否压缩
	    			compress:false
	    		},
	    		files:{
	    			"src/css/result.css":"src/less/source.less"
	    		}
	    	}
	    },
	    //合并js、css文件
	    concat: {
	    	js:{
	    		options: {
	        		banner: '<%= banner %>',
			        //清除源文件的注释
			        stripBanners: true,
			        separarot:';'
	      		},
		        src: ['src/js/*.js'],
		        dest: 'build/js/build.js'
	    	},
	    	css:{
	    		options: {
	        		banner: '<%= banner %>',
			        stripBanners: true,
			        separarot:''
	      		},
		        src: ['src/css/*.css'],
		        dest: 'build/css/build.css'
	    	}
	    },
	    //js文件压缩
	    uglify: {
	      options: {
	        banner: '<%= banner %>'
	      },
	      build:{
	      	src:'build/js/build.js',
	      	dest:'build/js/build.min.js'
	      }
	    },
	    //css文件压缩
	    cssmin:{
	    	build:{
	    		src:'build/css/build.css',
	    		dest:'build/css/build.min.css'
	    	}
	    },
	    //监听文件变化，执行任务
	    watch: {
	    	lessCompile:{
	    		files:['src/less/source.less'],
	    		tasks:['less:development']
	    	}
	    }
  });

  
  // 读取package的依赖
  	var tasks = pkg.devDependencies;
	for(var task in tasks){
		if(tasks.hasOwnProperty(task) && /grunt-*/.test(task)){
			// 加载所需要的grunt插件
			grunt.loadNpmTasks(task);
		}
	}

  // 自定义任务.
  grunt.registerTask('default', ['less']);

  grunt.registerTask('dev',['less','watch']);

  grunt.registerTask('publish',['clean','concat','uglify','cssmin']);
};
