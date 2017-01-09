class UserAmazonBook < ApplicationRecord
  belongs_to :user
  belongs_to :amazon_book

  validates :user,
    presence: true

  validates :amazon_book,
    presence: true
end
