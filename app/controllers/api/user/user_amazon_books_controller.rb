class Api::User::UserAmazonBooksController < ApplicationController
  def index
    @user_amazon_books = current_user
      .user_amazon_books
      .group("DATE_FORMAT(added_on, '%Y-%m-01')")
      .order("DATE_FORMAT(added_on, '%Y-%m-01')")
      .count

    render json: @user_amazon_books
  end

  def update
    user_amazon_book = current_user.user_amazon_books.find(params[:id])

    user_amazon_book.update_attributes!(
      params.require(:user_amazon_book).permit(:added_on)
    )

    render json: {
      result: true
    }
  end
end
