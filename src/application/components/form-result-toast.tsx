import { LucideAlertCircle, LucideCheckCircle } from 'lucide-react'
import { toast } from 'sonner'

type CustomFormResultToastProps = {
  variant: 'success' | 'error'
  title?: string
  description?: string
}

const icons = {
  success: <LucideCheckCircle className='size-6 stroke-green-400' />,
  error: <LucideAlertCircle className='size-6 stroke-destructive' />,
}

const defaultMessages = {
  success: {
    title: 'Alterado com sucesso',
    description: 'Dados alterados com sucesso',
  },
  error: {
    title: 'Ocorreu um erro',
    description: 'Tente novamente mais tarde',
  },
}

export const CustomFormResultToast = ({
  variant = 'success',
  title,
  description,
}: CustomFormResultToastProps) => {
  const defaultTitle = defaultMessages[variant].title
  const defaultDescription = defaultMessages[variant].description

  return toast(
    <div className='flex items-center gap-2'>
      {icons[variant]}

      <div>
        <h2 className='font-bold text-foreground'>{title || defaultTitle}</h2>
        <p className='text-xs text-muted-foreground'>{description || defaultDescription}</p>
      </div>
    </div>,
  )
}
