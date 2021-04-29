from rest_framework.views import APIView
from django.shortcuts import Http404
from rest_framework import status
from django.http.response import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.csrf import csrf_exempt

from api.models import Category, SubCategory, Product, User, Comment
from api.serializers import CategorySerializer, SubCategorySerializer, ProductSerializer, UserSerializer, CommentSerializer

from rest_framework.request import Request
from rest_framework.response import Response
import json


class CommentListAPIView(APIView):
    def get_objects(self, prodId):
        try:
            return Comment.objects.filter(productId=prodId)
        except Comment.DoesNotExist as e:
            raise Http404

    def get(self, request, prodId=None):
        comments = self.get_objects(prodId)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    def post(self, request, prodId=None):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    permission_classes = (IsAuthenticated,)



class CommentDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Comment.objects.get(id=pk)
        except Comment.DoesNotExist as e:
            raise Http404

    def get(self, request, prodId=None, pk=None):
        comments = self.get_object(pk)
        serializer = CommentSerializer(comments)
        return Response(serializer.data)

    def put(self, request, prodId=None, pk=None):
        comment = self.get_object(pk)
        serializer = CommentSerializer(instance=comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def delete(self, request, prodId=None, pk=None):
        comment = self.get_object(pk)
        comment.delete()
        return Response({'message': 'deleted'}, status=204)


