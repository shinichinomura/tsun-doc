class User < ApplicationRecord
  has_one :user_auth

  has_many :user_amazon_books
end
