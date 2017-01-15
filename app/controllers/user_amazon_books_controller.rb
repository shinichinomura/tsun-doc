class UserAmazonBooksController < ApplicationController
  def create
    UserAmazonBook.transaction do
      amazon_book = AmazonBook.find_or_create_by!(asin: params[:asin]) do |amazon_book|
        amazon_book.title = params[:title]
        amazon_book.url = params[:url]
      end

      AmazonBookThumbnail.find_or_create_by!(amazon_book: amazon_book) do |thumbnail|
        thumbnail.url = params[:thumbnail_url]
      end

      if params[:number_of_pages].present?
        AmazonBookPageCount.find_or_create_by!(amazon_book: amazon_book) do |page_count|
          page_count.number_of_pages = params[:number_of_pages]
        end
      end

      %i(width height length).each do |side|
        if params[side].present?
          AmazonBookDimension.find_or_create_by!(amazon_book: amazon_book, side: side) do |dimension|
            (size, unit) = params[side].split(' ', 2)
            dimension.size = size
            dimension.unit = unit
          end
        end
      end

      if current_user.user_amazon_books.where(amazon_book: amazon_book).present?
        render json: {
          result: false,
          message: I18n.t('user_amazon_books.create.already_exists')
        }
      else
        current_user.user_amazon_books.create!(amazon_book: amazon_book, added_on: Date.current)

        render json: {
          result: true,
          message: I18n.t('user_amazon_books.create.success')
        }
      end
    end
  end

  def destroy
    user_amazon_book = current_user.user_amazon_books.find(params[:id])

    user_amazon_book.destroy!

    flash[:notice] = I18n.t('user_amazon_books.destroy.success')

    redirect_to dashboard_path
  end
end
