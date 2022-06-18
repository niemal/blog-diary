# posts
rm -rf ./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is
rm -rf "./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is copy"
rm -rf "./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is copy 2"
rm -rf "./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is copy 3"
rm -rf "./posts/a_ridiculous_long_blog_title_ayy_lmao_yes_it_is copy 4"
rm -rf ./posts/another_blog_post_heh
rm -rf ./posts/markdown_example
rm -rf ./posts/random_title_94
rm -rf ./posts/random_title_9338838
rm -rf ./posts/title_of_the_blog_post
rm -rf ./posts/yeah_well_what_is
rm -rf ./posts/yet_another_blog_post

# move everything for nginx rendering
if [ ! -d "./pages/blog" ]; then
    mkdir "./pages/blog"
fi
mv ./pages/* ./pages/blog 2> /dev/null

# diary
rm -rf "./diary-entries/today"