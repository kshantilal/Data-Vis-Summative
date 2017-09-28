//Minify CSS
module.exports = function(grunt){
	grunt.initConfig({
		cssmin:{
			target: {
				files:[{
					expand: true,
					cwd: "css/",
					src: ["*.css", "*!min.css"],
					dest: "css/",
					ext: ".min.css"
				}]
			}
		},
		sass: {
			dist: {
				files: {
					"css/style.css":"scss/style.scss",

				}
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			my_target:{
				files:{
					"js/script.min.js":["js/script.js"]
				}
			}
		},
		jshint: {
			files: {
				src: "js/script.js",
				dest: "js/script_linted.js"
			},
			options:{
				globals:{
					jQuery: true
					
				},
				esversion: 6
			}
		},
		watch:{
			sass:{
				files:["scss/style.scss"],
				tasks:["sass"]
			},
			cssmin:{
				files:["css/style.css"],
				tasks:["cssmin"]
			}
		}


	})

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('css', ['sass']);
	grunt.registerTask("w", ["watch"]);
	grunt.registerTask("min", ["cssmin"]);
	grunt.registerTask("minjs", ["uglify"]);
	grunt.registerTask("hint", ["jshint"]);
};