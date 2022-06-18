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

# nesting everything for nginx multi-nextjs reverse proxies
mv ./pages/* ./pages/blog 2> /dev/null
# non-dangerous (perhaps) way to fix path issues by nesting everything
find ./pages/blog -type f -readable -writable -exec sed -i "s/\.\.\//\.\.\/\.\.\//g" {} \;

cat <<EOF > next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: "/blog",
}

module.exports = nextConfig
EOF

cat <<EOF > config.json
{
    "siteUrl": "https://niemal.dev/blog",
    "diary-allowed": ["none"],
    "service": "gmail",
    "auth": {
        "user": "niemallamein@gmail.com"
    }
}
EOF

# diary
rm -rf "./diary-entries/today"