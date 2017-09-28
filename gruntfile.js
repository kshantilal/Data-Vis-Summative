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



	grunt.registerTask('css', ['sass']);
	grunt.registerTask("w", ["watch"]);
};