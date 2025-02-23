'use client'
import {
   FacebookShareButton,
   FacebookIcon,
   TwitterShareButton,
   TwitterIcon,
   LinkedinShareButton,
   LinkedinIcon,
   WhatsappShareButton,
   WhatsappIcon,
} from 'next-share'

const SharedToSocialMedia = () => {
   return (
      <div className='flex items-center gap-2'>
         <FacebookShareButton
            url={'https://github.com/next-share'}
            quote={'next-share is a social share buttons for your next React apps.'}
            hashtag={'#nextshare'}
            blankTarget={true}
         >
            <FacebookIcon size={32} round />
         </FacebookShareButton>
         <TwitterShareButton
            url={'https://github.com/next-share'}
            title={'next-share is a social share buttons for your next React apps.'}
            hashtags={['next-share', 'react']}
            related={['@next-share', '@next-share']}
         >
            <TwitterIcon size={32} round />
         </TwitterShareButton>
         <LinkedinShareButton
            url={'https://github.com/next-share'}
            title={'next-share is a social share buttons for your next React apps.'}
            summary={'next-share is a social share buttons for your next React apps.'}
            source={''}
         >
            <LinkedinIcon size={32} round />
         </LinkedinShareButton>
         <WhatsappShareButton
            url={'https://github.com/next-share'}
            title={'next-share is a social share buttons for your next React apps.'}
            separator=":: "
         >
            <WhatsappIcon size={32} round />
         </WhatsappShareButton>

      </div>
   )
}

export default SharedToSocialMedia
