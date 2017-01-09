class AmazonBook < ApplicationRecord
  validates :asin,
    presence: true,
    length: { maximum: 16 }

  validates :title,
    presence: true,
    length: { maximum: 512 }

  validates :url,
    presence: true,
    length: { maximum: 2048 }
end
