import { ArrowLeftIcon, XIcon } from '@heroicons/react/outline'
import Typography from 'app/components/Typography'
import React, { FC } from 'react'

export interface ModalHeaderProps {
  header: string
  subheader?: string
  onClose?(): void
  onBack?(): void
}

const ModalHeader: FC<ModalHeaderProps> = ({ header, subheader, onBack, onClose }) => {
  return (
    <div className="flex items-start justify-between">
      {onBack ? (
        <ArrowLeftIcon onClick={onBack} width={24} height={24} className="cursor-pointer text-high-emphesis" />
      ) : (
        <div className="flex flex-col gap-1">
          <Typography weight={700} className="text-high-emphesis">
            {header}
          </Typography>
          {subheader && <Typography variant="sm">{subheader}</Typography>}
        </div>
      )}
      {onClose && (
        <div className="flex items-center justify-center w-6 h-6 cursor-pointer" onClick={onClose}>
          <XIcon width={24} height={24} className="text-high-emphesis" />
        </div>
      )}
    </div>
  )
}

export default ModalHeader
