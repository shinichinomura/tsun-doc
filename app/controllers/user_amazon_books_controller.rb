class UserAmazonBooksController < ApplicationController
  def create
    amazon_book = AmazonBook.find_or_create_by!(asin: params[:asin]) do |amazon_book|
      amazon_book.title = params[:title]
      amazon_book.url = params[:url]
    end

    if current_user.user_amazon_books.where(amazon_book: amazon_book).present?
      render json: {
        result: false,
        message: I18n.t('user_amazon_books.create.already_exists')
      }
    else
      current_user.user_amazon_books.create!(amazon_book: amazon_book)

      render json: {
        result: true,
        message: I18n.t('user_amazon_books.create.success')
      }
    end
  end
end
