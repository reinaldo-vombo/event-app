'use client'
import { PRIVE_ROUTES } from '@/constant/static-content'
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

type TProps = {
   slug: string
   title: string
   tags: string[] | undefined
}

const SharedToSocialMedia = ({ slug, title, tags }: TProps) => {
   return (
      <div className='flex items-center gap-2'>
         <FacebookShareButton
            url={`${PRIVE_ROUTES.share}${slug}`}
            quote={`🎉 Confira este evento: "${title}"! Não perca essa oportunidade!`}
            hashtag={'#evento #conecte-se'}
            blankTarget={true}
         >
            <FacebookIcon size={32} round />
         </FacebookShareButton>
         <TwitterShareButton
            url={`${PRIVE_ROUTES.share}${slug}`}
            title={`🎉 Confira este evento: "${title}"! Não perca essa oportunidade!`}
            hashtags={tags ?? ['evento', 'conecte-se']}
            related={['@next-share', '@next-share']}
            blankTarget={true}
         >
            <TwitterIcon size={32} round />
         </TwitterShareButton>
         <LinkedinShareButton
            url={`${PRIVE_ROUTES.share}${slug}`}
            title={`🎉 Confira este evento: "${title}"! Não perca essa oportunidade!`}
            summary={`Participe do evento "${title}" e conecte-se com pessoas incríveis. Saiba mais agora!`}
            source={process.env.NEXT_PUBLIC_URL}
            blankTarget={true}
         >
            <LinkedinIcon size={32} round />
         </LinkedinShareButton>
         <WhatsappShareButton
            url={`${PRIVE_ROUTES.share}${slug}`}
            title={`🎉 Confira este evento: "${title}"! Não perca essa oportunidade!`}
            separator=":: "
            blankTarget={true}
         >
            <WhatsappIcon size={32} round />
         </WhatsappShareButton>

      </div>
   )
}

export default SharedToSocialMedia
