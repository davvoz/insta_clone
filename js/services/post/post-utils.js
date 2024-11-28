export function extractProfileImage(account) {
    const steemitUrl = `https://steemitimages.com/u/${account.name}/avatar`;
    
    try {
        const metadata = JSON.parse(account.blog_json_metadata);
        return metadata.profile.profile_image || steemitUrl;
    } catch (e) {
        try {
            const metadata = JSON.parse(account.posting_json_metadata);
            return metadata.profile.profile_image || steemitUrl;
        } catch (e) {
            try {
                const metadata = JSON.parse(account.json_metadata);
                return metadata.profile.profile_image || steemitUrl;
            } catch (e) {
                console.warn('Failed to parse profile metadata');
                return steemitUrl;
            }
        }
    }
}


export function extractImageFromContent(post) {
    if (!post || !post.body) return null;

    try {
        // Try to find Markdown image
        const markdownMatch = post.body.match(/!\[.*?\]\((.*?)\)/);
        if (markdownMatch) return markdownMatch[1];

        // Try to find HTML image
        const htmlMatch = post.body.match(/<img[^>]+src="([^">]+)"/);
        if (htmlMatch) return htmlMatch[1];

        // Try to find raw URL
        const urlMatch = post.body.match(/(https?:\/\/[^\s<>"']*?\.(?:png|jpe?g|gif|webp))/i);
        if (urlMatch) return urlMatch[1];

        //troviamo queste https://files.peakd.com/file/peakd-hive/udabeu/23uFGt15Tj6H3ih7gGNvPWrCADDTFMSxD3t4VFbxmHYdvMXzMF3SXG47ibJbbnpCeQ21x.jpg
        const urlMatch2 = post.body.match(/(https?:\/\/[^\s<>"']*?\.(?:jpg|png|jpeg|gif|webp))/i);
        if (urlMatch2) return urlMatch2[1];

        



        return null;
    } catch (error) {
        console.warn('Failed to extract image from content:', error);
        return null;
    }
}

export function cleanImageUrl(url) {
    if (!url) return null;
    try {
        return url.replace(/\\\//g, '/').trim();
    } catch (error) {
        console.warn('Failed to clean image URL:', error);
        return url;
    }
}

export function getFallbackAvatar(username) {
    const fallbacks = [
        `https://images.hive.blog/u/${username}/avatar`,
        `https://steemitimages.com/u/${username}/avatar/small`,
        'https://steemitimages.com/u/default-avatar/avatar/small'
    ];
    return fallbacks[0];
}